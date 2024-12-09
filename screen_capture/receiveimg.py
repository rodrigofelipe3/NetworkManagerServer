import tkinter as tk
from tkinter import messagebox
import socket
import pickle
import struct
import cv2
import numpy as np
from screeninfo import get_monitors
import threading
from PIL import Image, ImageTk
from pynput import mouse, keyboard
import sys

# Variáveis globais
isconnected = False
current_x, current_y = 0, 0
mouse_button = None
keyboard_button = None
click_type = None
scroll_pos = 0
last_scroll_pos = 0
button_held = False
SERVER_IP = '0.0.0.0'
SERVER_PORT = 8080
running = False
current_frame = None
selected_screen = 0
mouse_control_active = False
mouse_in = False
client_screen_info = None
conn = None
CLICK_HOLD_THRESHOLD_MS = 370
click_start_time = None
keyboard_control_active = False
total_screen_info = ''

new_width = 0
new_height = 0


def start_server():
    global running, mouse_button, keyboard_button, isconnected
    if status_label['text'] == 'Servidor Parado.':
        update_status('Aguardando conexão do cliente...')
    if stop_button['state'] == "disabled":
        stop_button['state'] = 'normal'
        if start_button['state'] == 'normal':
            start_button['state'] = 'disabled'
    running = True
    threading.Thread(target=receive_screen, daemon=True).start()

def stop_server():
    global running, mouse_button, keyboard_button, isconnected, mouse_control_active, keyboard_control_active, conn
    if status_label['text'] == "Aguardando conexão do cliente...":
        update_status('Servidor Parado.')
    if keyboard_button["state"] != "disable":
        keyboard_button['state'] = "disable"
        if isconnected == True and keyboard_control_active == True:
            toggle_keyboard_control()

    if mouse_button["state"] != "disable":
        mouse_button['state'] = "disable"
        if isconnected == True and mouse_control_active == True:    
            toggle_mouse_control()

    if start_button['state'] == 'disabled':
            start_button['state'] = 'normal'
            if stop_button['state'] == "normal":
                stop_button['state'] = 'disabled'
    running = False
    isconnected = False
    conn.close()
    clear_screen()
    

def clear_screen():
    global current_frame
    current_frame = None
    lmain.config(image='')

def toggle_mouse_control():
    """Ativa ou desativa o controle do mouse."""
    global mouse_control_active, mouse_listener, mouse_button
    
    mouse_control_active = not mouse_control_active
    # Inicia o listener do mouse somente se o controle do mouse estiver ativo
    if mouse_control_active:
        mouse_button['bg'] = '#6bce76' #Definir a cor verde para o botão do mouse
        mouse_listener = mouse.Listener(on_click=on_click, on_scroll=on_scroll)
        mouse_listener.start()
    else:
        mouse_button['bg'] = 'lightgrey' #Definir a cor verde para o botão do mouse
        if mouse_listener:
            mouse_listener.stop()
            mouse_listener = None

def toggle_keyboard_control():
    global keyboard_control_active, keyboard_listener, keyboard_button
    keyboard_control_active = not keyboard_control_active
    
    if keyboard_control_active:
        keyboard_button['bg'] = '#6bce76'
        keyboard_listener = keyboard.Listener(on_press=on_key_press)
        keyboard_listener.start()
    else:
        keyboard_button['bg'] = 'lightgrey'
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
            print(key_formated)
            conn.sendall(f"key:{key_formated}".encode('utf-8'))
        except Exception as e:
            update_status(f"Erro ao enviar tecla pressionada: {e}")

def on_click(x, y, button, pressed):
    """Detecta cliques do mouse e envia o tipo de clique."""
    global conn

    if mouse_control_active and mouse_in:
        try:
            if pressed:
                if button == mouse.Button.left:
                    click_type = "click_type:left"
                elif button == mouse.Button.right:
                    click_type = "click_type:right"
                elif button == mouse.Button.middle:
                    click_type = "click_type:middle"
                else:
                    click_type = "click_type:unknown"
                    
                conn.sendall(click_type.encode('utf-8'))
                click_type = None
        except Exception as e:
            show_error(f"Erro ao enviar clique: {e}")

def on_scroll(x, y, dx, dy):
    """Detecta rolagem do mouse e envia a direção do scroll."""
    global conn

    if mouse_control_active and mouse_in:
        try:
            scroll_direction = f"scroll:{dy}"
            conn.sendall(scroll_direction.encode('utf-8'))
        except Exception as e:
            show_error(f"Erro ao enviar scroll: {e}")


def send_mouse_position():
    """Envia as coordenadas do mouse."""
    global conn, current_x, current_y, total_screen_info, selected_screen
    x, y, width, height = total_screen_info[selected_screen]  # Informações da tela selecionada
    width_total = x + width  # Largura total considerando o deslocamento inicial

    if client_screen_info and conn and mouse_control_active:
        client_width, client_height = width, height
        window_width, window_height = lmain.winfo_width(), lmain.winfo_height()
        
        # Verificar se o mouse está dentro da área de renderização de `lmain`
        if 0 <= current_x <= window_width and 0 <= current_y <= window_height:
            # Converter as coordenadas do `lmain` para a tela do cliente
            client_x = int(current_x * client_width / window_width)
            client_y = int(current_y * client_height / window_height)
            
            print('Antes do if: ', selected_screen)
            # Ajustar as coordenadas do mouse para a segunda tela (ou telas subsequentes)
            if selected_screen > 0:
                client_x += x  # Adicionar o deslocamento horizontal da tela selecionada

            # Limitar as coordenadas para permanecer dentro da área da tela
                client_x = min(max(client_x, 0), client_width - 1)
                client_y = min(max(client_y, 0), client_height - 1)

                # Enviar as coordenadas apenas se o botão do mouse não estiver sendo pressionado
                if not button_held:
                    print('Depois do if: ', selected_screen)
                    print('Depois do if: ', client_x)
                    mouse_position_string = f"mouse: x:{client_x} y:{client_y}"
                    try:
                        conn.sendall(mouse_position_string.encode('utf-8'))
                    except Exception as e:
                        update_status(f"Erro ao enviar dados do mouse: {e}")
            else:
                 # Limitar as coordenadas para permanecer dentro da área da tela
                client_x = min(max(client_x, 0), client_width - 1)
                client_y = min(max(client_y, 0), client_height - 1)

                # Enviar as coordenadas apenas se o botão do mouse não estiver sendo pressionado
                if not button_held:
                    mouse_position_string = f"mouse: x:{client_x} y:{client_y}"
                    try:
                        conn.sendall(mouse_position_string.encode('utf-8'))
                    except Exception as e:
                        update_status(f"Erro ao enviar dados do mouse: {e}")

def on_mouse_move(event):
    """Envia a posição do mouse dentro da área renderizada do `lmain`."""
    global current_x, current_y
    if running and mouse_control_active:
        current_x, current_y = event.x, event.y
        send_mouse_position()


def receive_screen():
    global running, current_frame, client_screen_info, conn, isconnected, new_height, new_width, total_screen_info
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((SERVER_IP, SERVER_PORT))
    server_socket.listen(1)

    update_status("Aguardando conexão do cliente...")
    try:
        conn, addr = server_socket.accept()
        screen_server_info = f'width: {root.winfo_screenwidth()}'
        conn.sendall(screen_server_info.encode())
        isconnected = True
        update_status(f"Conectado a {addr}")
        keyboard_button.config(state="normal" if isconnected == True else "disabled")
        mouse_button.config(state='normal' if isconnected == True else "disabled")
        conn.sendall(struct.pack("!I", selected_screen))
        screens_info_data = conn.recv(4096)
        screens_info = pickle.loads(screens_info_data)
        total_screen_info = screens_info

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

    except Exception as e:
        show_error(f"Ocorreu um erro no servidor: {e}")
    finally:
        conn.close()
        update_status("Servidor parado.")


def create_screen_buttons(num_screens, conn):
    for widget in screen_buttons_frame.winfo_children():
        widget.destroy()
    for i in range(num_screens):
        btn_image = img[i] if i < len(img) else img[0]
        btn = tk.Button(screen_buttons_frame, image=btn_image, command=lambda i=i: change_screen(i, conn), width=30, height=30, bg='lightgrey')
        btn.pack(side="left", padx=5, pady=5) 

def change_screen(screen_number, conn):
    global selected_screen
    selected_screen = screen_number
    try:
        if conn:
            conn.sendall(str.encode(f'screen: {screen_number}'))
            update_status(f"Tela {screen_number + 1} selecionada.")
        else:
            update_status("Conexão não está ativa.")
    except Exception as e:
        update_status(f"Erro ao mudar de tela: {e}")

def update_frame():
    global current_frame
    
    if current_frame is not None:
        # Obtém a resolução da tela (não da janela)
        screen_height = root.winfo_screenheight()
        # Calcula a altura máxima permitida (90% da altura da tela)
        max_height = int(screen_height * 0.9)
        # Obtém as dimensões da imagem
        img_height, img_width = current_frame.shape[:2]
        # Calcula a nova altura e largura mantendo a proporção
        if img_height > max_height:
            # Redimensiona a imagem para que a altura seja 90% da altura da tela
            scale_factor = max_height / img_height
            new_height = max_height
            new_width = int(img_width * scale_factor)
        else:
            # Se a imagem já está dentro do limite, usa suas dimensões originais
            new_height = img_height
            new_width = img_width
        # Redimensiona a imagem
        resized_img = cv2.resize(current_frame, (new_width, new_height))
        # Converte a imagem para o formato RGB para exibição com o PIL
        img_rgb = cv2.cvtColor(resized_img, cv2.COLOR_BGR2RGB)
        img_pil = Image.fromarray(img_rgb)
        imgtk = ImageTk.PhotoImage(image=img_pil)
        # Atualiza o rótulo com a nova imagem
        lmain.imgtk = imgtk
        lmain.configure(image=imgtk)
        lmain.place(x=(root.winfo_screenwidth() - new_width)//2, y=(root.winfo_screenheight() - new_height) // 2)

    lmain.after(16, update_frame)

def update_status(msg):
    status_label.config(text=msg)

def show_error(msg):
    messagebox.showerror("Erro", msg)

def mouse_in_capture(event):
    global mouse_in
    mouse_in = not mouse_in

def mouse_out_capture(event):
    global mouse_in
    mouse_in = not mouse_in

if __name__ == "__main__":
    root = tk.Tk()
    root.title("Servidor de Compartilhamento de Tela")
    root.state('zoomed')  # Define a janela como maximizada ao iniciar
    root.geometry(f"{root.winfo_screenwidth()}x{root.winfo_screenheight()}")
    root.configure(bg="#2b2b2b")
    
    menu_width = root.winfo_screenwidth()
    menu_top = tk.Frame(root, bg='#9b9b9b', height=35)
    menu_top.pack(side="top", fill="x")  # Ocupará toda a largura da janela
    
    status_label = tk.Label(root, text="Servidor parado.", fg="#fff", bg='#2b2b2b', font=('Arial', 18))
    status_label.pack(padx=10)

    # Frame para botões de telas
    screen_buttons_frame = tk.Frame(menu_top, bg='#9b9b9b')
    screen_buttons_frame.pack(side="right", padx=5, pady=5)
    # Definindo os ícones dos botões
    play_icon = ImageTk.PhotoImage(file='./assets/imagens/play_icon-removebg-preview.png')
    stop_icon = ImageTk.PhotoImage(file='./assets/imagens/stop_icon.png')
    mouse_icon = ImageTk.PhotoImage(file='./assets/imagens/mouse_icon.png')
    keyboard_icon = ImageTk.PhotoImage(file='./assets/imagens/keyboard_icon-removebg-preview.png')
    
    img_paths = [
        './assets/imagens/Tela1.png',
        './assets/imagens/Tela2.png',
        './assets/imagens/Tela2.png',
        './assets/imagens/Tela2.png',
    ]

    img = []
    for path in img_paths:
        img.append(ImageTk.PhotoImage(file=path))

    # Frame para os botões dentro do menu_top
    screen_buttons_frame2 = tk.Frame(menu_top, bg='#9b9b9b')
    screen_buttons_frame2.pack(side="left", padx=10, pady=5)  # Botões alinhados à esquerda
    
    # Adicionando os botões ao frame de botões
    start_button = tk.Button(screen_buttons_frame2, bg="lightgrey", image=play_icon, command=start_server, width=37, height=37)
    start_button.pack(side="left", padx=5, pady=5)

    stop_button = tk.Button(screen_buttons_frame2, bg="lightgrey", image=stop_icon, command=stop_server, state='disabled', width=37, height=37)
    stop_button.pack(side="left", padx=5, pady=5)

    mouse_button = tk.Button(screen_buttons_frame2, bg="lightgrey", image=mouse_icon, command=toggle_mouse_control, state="disabled", width=37, height=37)
    mouse_button.pack(side="left", padx=5, pady=5)

    keyboard_button = tk.Button(screen_buttons_frame2, bg="lightgrey", image=keyboard_icon, command=toggle_keyboard_control, state='disabled',width=37, height=37)
   
    keyboard_button.pack(side="left", padx=5, pady=5)
    start_server()
    
    # Label principal para outros elementos
    lmain = tk.Label(root, bg="#2b2b2b")
    lmain.bind('<Enter>', mouse_in_capture)
    lmain.bind('<Leave>', mouse_out_capture)
    lmain.bind('<Motion>', on_mouse_move)
    # Inicia o frame de atualização
    update_frame()
    root.mainloop()