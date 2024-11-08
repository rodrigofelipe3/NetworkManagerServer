import tkinter as tk
from PIL import Image, ImageTk
import pyautogui
import json
import socket
import struct
from io import BytesIO
import threading
from pynput import mouse
# Configuração da Janela Tkinter
root = tk.Tk()
root.title('Visualizador de Captura de Tela - Servidor')

# Variáveis para armazenar o estado do mouse
mouse_position = (0, 0)
left_button_pressed = False
right_button_pressed = False
scroll_direction = None

def enviar_dados(data):
    mensagem = json.dumps(data).encode('utf-8')
    conn.sendall(mensagem)
# Função chamada ao mover o mouse
def on_move(x, y):
    data = {"tipo": "move", "posicao": (x, y)}
    enviar_dados(data)
    print(f"Mouse moved to {x, y}")

# Função chamada ao clicar
def on_click(x, y, button, pressed):
    data = {
        "tipo": "click",
        "botao": str(button),
        "pressionado": pressed,
        "posicao": (x, y)
    }
    enviar_dados(data)
    estado = "pressed" if pressed else "released"
    print(f"{button} button {estado} at {x, y}")

# Função chamada ao usar o scroll
def on_scroll(x, y, dx, dy):
    direction = "up" if dy > 0 else "down"
    data = {"tipo": "scroll", "direcao": direction, "posicao": (x, y)}
    enviar_dados(data)
    print(f"Scrolled {direction} at ({x}, {y})")

# Função principal para iniciar o monitoramento do mouse
def monitor_mouse():
    with mouse.Listener(on_move=on_move, on_click=on_click, on_scroll=on_scroll) as listener:
        listener.join()

# Variável de controle para a captura de tela
captura_ativa = False
conn = None  # Variável de conexão global
# Função para atualizar a tela com a imagem recebida
def atualizar_tela(data):
    # Converter os dados recebidos em uma imagem PIL
    img = Image.open(BytesIO(data))
    # Redimensionar a imagem para caber na área de exibição
    img = img.resize((screen_width, screen_height - frame_botoes.winfo_height()), Image.Resampling.LANCZOS)
    img_tk = ImageTk.PhotoImage(img)

    # Atualizar o Label com a nova imagem
    label_img.config(image=img_tk)
    label_img.image = img_tk
    
    

# Função para exibir o status de "Aguardando conexão"
def mostrar_status_aguardando():
    status_label.config(text="Aguardando conexão com cliente...")
    status_label.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

# Função para iniciar o servidor em uma thread separada
def iniciar_servidor():
    global captura_ativa, conn
    captura_ativa = True
    iniciar_btn.config(state="disabled")
    parar_btn.config(state="normal")

    # Exibir o status de "Aguardando conexão"
    mostrar_status_aguardando()

    # Iniciar uma thread para receber dados
    threading.Thread(target=receber_dados, daemon=True).start()
    threading.Thread(target=monitor_mouse, daemon=True).start()

# Função para receber dados do cliente e atualizar a tela
def receber_dados():
    global conn
    try:
        # Configuração do socket
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.bind(('0.0.0.0', 5000))
        server_socket.listen(1)
        print("Aguardando conexão do cliente...")
        conn, _ = server_socket.accept()
        print("Cliente conectado!")

        # Remover o texto de status quando o cliente se conectar
        root.after(0, lambda: status_label.place_forget())

        # Receber e atualizar a tela
        while captura_ativa:
            # Receber o tamanho da imagem
            tamanho_bytes = conn.recv(4)
            if not tamanho_bytes:
                break  # Encerrar se a conexão for fechada
            tamanho = struct.unpack("!I", tamanho_bytes)[0]

            # Receber a imagem de acordo com o tamanho
            data = bytearray()
            while len(data) < tamanho:
                packet = conn.recv(tamanho - len(data))
                if not packet:
                    break  # Encerrar se a conexão for fechada
                data.extend(packet)
            x, y = pyautogui.position()
            coordenadas = f"{x},{y}"
            conn.sendall(coordenadas.encode())
            # Verificar se todos os dados foram recebidos antes de processar a imagem
            if len(data) == tamanho:
                # Atualizar a tela com a imagem recebida, executando no loop principal do Tkinter
                root.after(0, atualizar_tela, data)

    except KeyboardInterrupt:
        print("Monitoramento de clique finalizado.")
        
    except Exception as e:
        print(f"Erro: {e}")
    finally:
        if conn:
            conn.close()

# Função para parar o servidor
def parar_servidor():
    global captura_ativa
    captura_ativa = False
    iniciar_btn.config(state="normal")
    parar_btn.config(state="disabled")
    
    if conn:
        conn.close()

    # Limpar a imagem exibida e restaurar a tela em branco
    label_img.config(image=None)
    label_img.image = None
    
    # Restaurar o texto de status quando o servidor parar
    mostrar_status_aguardando()

# Configurações da janela
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()
root.geometry(f"{screen_width}x{screen_height}")

# Frame para os botões
frame_botoes = tk.Frame(root)
frame_botoes.pack(fill=tk.X, pady=10)

play_icon = Image.open("./renderer/src/assets/imagens/play.png").resize((30, 30), Image.Resampling.LANCZOS)
stop_icon = Image.open("./renderer/src/assets/imagens/stopicon.png").resize((30, 30), Image.Resampling.LANCZOS)

# Converter ícones para PhotoImage
play_icon_tk = ImageTk.PhotoImage(play_icon)
stop_icon_tk = ImageTk.PhotoImage(stop_icon)

# Botão para iniciar o servidor
iniciar_btn = tk.Button(frame_botoes, image=play_icon_tk, command=iniciar_servidor, font=("Helvetica", 14))
iniciar_btn.pack(side=tk.LEFT, padx=20)

# Botão para parar o servidor
parar_btn = tk.Button(frame_botoes, image=stop_icon_tk, command=parar_servidor, font=("Helvetica", 14), state="disabled")
parar_btn.pack(side=tk.LEFT, padx=20)

# Label para exibir a captura de tela
label_img = tk.Label(root)
label_img.pack(fill=tk.BOTH, expand=True)

# Label de status para exibir "Aguardando conexão com cliente" centralizado
status_label = tk.Label(root, text="Aguardando conexão com cliente...", font=("Helvetica", 16))
# Exibe o status inicial
mostrar_status_aguardando()

# Iniciar o loop principal do Tkinter
root.mainloop()