import tkinter as tk
from tkinter import messagebox
import socket
import pickle
import struct
import cv2
import numpy as np
import threading
from PIL import Image, ImageTk
from pynput import mouse, keyboard
import time

# Variáveis globais
current_x, current_y = 0, 0
mouse_button = None
keyboard_button = None
click_type = None
scroll_pos = 0
last_scroll_pos = 0
button_held = False
FRAME_RATE = 1/60  # Target frame rate of 60fps
SERVER_IP = '10.10.1.139'
SERVER_PORT = 12345
running = False
current_frame = None
selected_screen = 0
mouse_control_active = False
client_screen_info = None
conn = None
CLICK_HOLD_THRESHOLD_MS = 500
click_start_time = None
keyboard_control_active = False


def start_server():
    global running, mouse_button, keyboard_button
    if keyboard_button["state"] != "normal":
        keyboard_button['state'] = "normal"
    if mouse_button["state"] != "normal":
        mouse_button['state'] = "normal"
    running = True
    threading.Thread(target=receive_screen, daemon=True).start()

def stop_server():
    global running, mouse_button, keyboard_button
    if keyboard_button["state"] != "disable":
        keyboard_button['state'] = "disable"
    if mouse_button["state"] != "disable":
        mouse_button['state'] = "disable"
    running = False
    clear_screen()

def clear_screen():
    global current_frame
    current_frame = None
    current_frame = None
    lmain.config(image='')
    lmain.config(image='')

def toggle_mouse_control():
    """Ativa ou desativa o controle do mouse."""
    global mouse_control_active, mouse_listener

    mouse_control_active = not mouse_control_active
    mouse_button.config(text="Desativar Controle do Mouse" if mouse_control_active else "Ativar Controle do Mouse")

    # Inicia o listener do mouse somente se o controle do mouse estiver ativo
    if mouse_control_active:
        mouse_listener = mouse.Listener(on_click=on_click, on_scroll=on_scroll)
        mouse_listener.start()
    else:
        if mouse_listener:
            mouse_listener.stop()
            mouse_listener = None

def toggle_keyboard_control():
    global keyboard_control_active, keyboard_listener
    keyboard_control_active = not keyboard_control_active
    keyboard_button.config(text="Desativar Controle do Teclado" if keyboard_control_active else "Ativar Controle do Teclado")
    if keyboard_control_active:
        keyboard_listener = keyboard.Listener(on_press=on_key_press)
        keyboard_listener.start()
    else:
        if keyboard_listener:
            keyboard_listener.stop()
            keyboard_listener = None

def on_key_press(key):
    """Detecta teclas pressionadas e envia para o cliente apenas se o controle do teclado estiver ativo e a janela estiver em foco."""
    if keyboard_control_active and conn and root.focus_get() == root:
        try:
            # Envia a tecla pressionada para o cliente
            key_data = str(key)
            key_formated = key_data.replace("'","")
            conn.sendall(f"key:{key_formated}".encode('utf-8'))
            #print(f"Enviando tecla: {key_data}")
        except Exception as e:
            update_status(f"Erro ao enviar tecla pressionada: {e}")

def on_click(x, y, button, pressed):
    """Detecta cliques do mouse e envia apenas se o controle do mouse estiver ativo."""
    global click_type, button_held, click_start_time

    if mouse_control_active:
        if pressed:
            button_held = True  # Indica que o botão está pressionado
            click_start_time = time.time()  # Armazena o tempo de início do clique
            if button == mouse.Button.left:
                click_type = "left"
            elif button == mouse.Button.right:
                click_type = "right"
            elif button == mouse.Button.middle:
                click_type = "middle"
        else:
            button_held = False  # Solta o botão quando o clique é liberado

            # Calcular a duração do clique em milissegundos
            click_duration = (time.time() - click_start_time) * 1000
            
            # Verifica se o clique foi longo o suficiente para ser um "hold"
            if click_type == "left" and click_duration >= CLICK_HOLD_THRESHOLD_MS:
                click_type = "left_hold"
            else:
                click_type = "left" if click_type == "left" else click_type

            click_start_time = None  # Resetar o tempo do clique
            send_mouse_position()


def on_scroll(x, y, dx, dy):
    """Detecta rolagem do scroll e envia apenas se o controle do mouse estiver ativo."""
    global scroll_pos
    if mouse_control_active:
        scroll_pos += dy  # Atualiza o valor acumulado de rolagem
        send_mouse_position()

def send_mouse_position():
    """Envia as coordenadas do mouse, tipo de clique e rolagem apenas se o controle do mouse estiver ativo."""
    global conn, current_x, current_y, click_type, scroll_pos, last_scroll_pos, button_held

    if client_screen_info and conn and mouse_control_active:
        client_width, client_height = client_screen_info[2], client_screen_info[3]
        window_width, window_height = lmain.winfo_width(), lmain.winfo_height()

        # Verificar se o mouse está dentro da área de renderização de `lmain`
        if 0 <= current_x <= window_width and 0 <= current_y <= window_height:
            # Converter as coordenadas do `lmain` para a tela do cliente
            client_x = int(current_x * client_width / window_width)
            client_y = int(current_y * client_height / window_height)
            
            client_x = min(max(client_x, 0), client_width - 1)
            client_y = min(max(client_y, 0), client_height - 1)

            scroll_value = scroll_pos if scroll_pos != last_scroll_pos else "none"
            last_scroll_pos = scroll_value  # Atualiza o último scroll enviado
            
            if not button_held:
                click_action = click_type
                mouse_position_string = f"mouse:x:{client_x} y:{client_y} click_type:{click_action} scroll_pos:{scroll_value}"
                print(f"Sending: {mouse_position_string}")
                scroll_pos = 0  # Reseta o scroll após o envio

                # Envia a string para o cliente
                try:
                    conn.sendall(mouse_position_string.encode('utf-8'))
                    click_type = None
                except Exception as e:
                    update_status(f"Erro ao enviar dados do mouse: {e}")

def on_mouse_move(event):
    """Envia a posição do mouse dentro da área renderizada do `lmain`."""
    global current_x, current_y
    if running and mouse_control_active:
        current_x, current_y = event.x, event.y
        send_mouse_position()


def receive_screen():
    global running, current_frame, client_screen_info, conn
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((SERVER_IP, SERVER_PORT))
    server_socket.listen(1)

    update_status("Aguardando conexão do cliente...")
    try:
        conn, addr = server_socket.accept()
        update_status(f"Conectado a {addr}")
        
        conn.sendall(struct.pack("!I", selected_screen))
        screens_info_data = conn.recv(4096)
        screens_info = pickle.loads(screens_info_data)
        client_screen_info = screens_info[selected_screen]

        if not screens_info:
            show_error("Nenhuma tela detectada no cliente.")
            return

        create_screen_buttons(len(screens_info), conn)

        while running:
            raw_msglen = conn.recv(4)
            if not raw_msglen:
                update_status("Erro ao receber o tamanho da mensagem.")
                break

            msglen = struct.unpack("!L", raw_msglen)[0]
            data = b''

            while len(data) < msglen:
                packet = conn.recv(msglen - len(data))
                if not packet:
                    update_status("Erro ao receber os dados da imagem.")
                    break
                data += packet

            try:
                image_data = pickle.loads(data)
                np_img = np.frombuffer(image_data, dtype=np.uint8)
                img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
                if img is not None:
                    current_frame = img
                else:
                    update_status("Erro na decodificação da imagem.")
            except Exception as e:
                show_error(f"Erro no processamento da imagem: {e}")
                break
            time.sleep(FRAME_RATE)

    except Exception as e:
        show_error(f"Ocorreu um erro no servidor: {e}")
    finally:
        conn.close()
        update_status("Servidor parado.")


def create_screen_buttons(num_screens, conn):
    for widget in screen_buttons_frame.winfo_children():
        widget.destroy()

    for i in range(num_screens):
        btn = tk.Button(screen_buttons_frame, text=f"Tela {i + 1}", command=lambda i=i: change_screen(i, conn))
        btn.pack(side=tk.LEFT, padx=5)

def change_screen(screen_number, conn):
    global selected_screen
    selected_screen = screen_number
    try:
        if conn:
            conn.sendall(struct.pack("!I", screen_number))
            update_status(f"Tela {screen_number + 1} selecionada.")
            print(f'Tela {screen_number + 1} selecionada.')
        else:
            update_status("Conexão não está ativa.")
    except Exception as e:
        update_status(f"Erro ao mudar de tela: {e}")

def update_frame():
    global current_frame
    if current_frame is not None:
        img = cv2.cvtColor(current_frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(img)
        imgtk = ImageTk.PhotoImage(image=img)
        lmain.imgtk = imgtk
        lmain.configure(image=imgtk)
    lmain.after(1, update_frame)

def update_status(msg):
    status_label.config(text=msg)

def show_error(msg):
    messagebox.showerror("Erro", msg)


if __name__ == "__main__":
    root = tk.Tk()
    root.title("Servidor de Compartilhamento de Tela")

    control_frame = tk.Frame(root)
    control_frame.pack()

    start_button = tk.Button(control_frame, text="Iniciar Servidor", command=start_server)
    start_button.pack(side=tk.LEFT, padx=5)

    stop_button = tk.Button(control_frame, text="Parar Servidor", command=stop_server)
    stop_button.pack(side=tk.LEFT, padx=5)

    mouse_button = tk.Button(control_frame, text="Ativar Controle do Mouse", command=toggle_mouse_control, state=["disable"])
    mouse_button.pack(side=tk.LEFT, padx=5)

    keyboard_button = tk.Button(control_frame, text="Ativar Controle do Teclado", command=toggle_keyboard_control, state=["disable"])
    keyboard_button.pack(side=tk.LEFT, padx=5)

    status_label = tk.Label(root, text="Servidor parado.", fg="blue")
    status_label.pack(pady=5)

    screen_buttons_frame = tk.Frame(root)
    screen_buttons_frame.pack()

    lmain = tk.Label(root)
    lmain.pack()

    lmain.bind('<Motion>', on_mouse_move)

    update_frame()
    root.mainloop()
