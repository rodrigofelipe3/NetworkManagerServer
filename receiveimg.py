import socket
import threading
import pickle
import time
import pyautogui
import cv2

# Variável de controle para threads ativas por cliente
clientes_ativos = {}
clientes_lock = threading.Lock()
server_socket = None  # Para controle do socket no escopo global

def exibir_tela(client_socket, addr):
    global clientes_ativos
    resolucao_cliente = (1920, 1080)  # Resolução padrão

    try:
        cv2.namedWindow(f"Tela {addr}", cv2.WINDOW_NORMAL)
        cv2.setWindowProperty(f"Tela {addr}", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

        while True:
            pacote_tamanho = client_socket.recv(4)
            if not pacote_tamanho:
                break

            tamanho = int.from_bytes(pacote_tamanho, 'big')
            dados_tela = b""
            while len(dados_tela) < tamanho:
                pacote = client_socket.recv(4096)
                if not pacote:
                    break
                dados_tela += pacote

            frame = pickle.loads(dados_tela)
            tela = cv2.imdecode(frame, cv2.IMREAD_COLOR)

            cv2.imshow(f"Tela {addr}", tela)

            if cv2.waitKey(1) == 27:  # 27 é o código ASCII para ESC
                break

    except socket.error as e:
        print(f"Erro ao receber tela de {addr}: {e}")
    finally:
        client_socket.close()
        with clientes_lock:
            del clientes_ativos[addr]
        cv2.destroyAllWindows()

def enviar_comandos(client_socket):
    try:
        while True:
            # Obtém a posição do mouse
            x, y = pyautogui.position()
            comando = f"mouse,{x},{y}\n"  # Envia a posição do mouse
            client_socket.sendall(comando.encode())
            time.sleep(0.1)  # Delay para não sobrecarregar

            # Aguarda um evento de clique do mouse
            if cv2.waitKey(1) & 0xFF == ord('c'):  # Pressione 'c' para simular clique
                comando_click = f"mouse_click,{x},{y}\n"
                client_socket.sendall(comando_click.encode())

    except socket.error as e:
        print(f"Erro ao enviar comandos: {e}")
    finally:
        client_socket.close()

def aceitar_conexao(server_socket):
    global clientes_ativos
    while True:
        try:
            client_socket, addr = server_socket.accept()
            print(f"Conectado a: {addr}")

            resolucao_data = client_socket.recv(1024).decode()
            if resolucao_data.startswith('resolucao'):
                _, largura_tela, altura_tela = resolucao_data.split(',')
                resolucao_cliente = (int(largura_tela), int(altura_tela))

            with clientes_lock:
                if addr not in clientes_ativos:
                    clientes_ativos[addr] = client_socket
                    threading.Thread(target=exibir_tela, args=(client_socket, addr)).start()
                    threading.Thread(target=enviar_comandos, args=(client_socket,)).start()
                else:
                    print(f"Cliente {addr} já está ativo, ignorando nova conexão.")
                    client_socket.close()

        except socket.error as e:
            print(f"Erro ao aceitar conexão: {e}")

def main_servidor():
    global server_socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('', 12345))
    server_socket.listen(5)
    print("Servidor aguardando conexões...")

    try:
        aceitar_conexao(server_socket)
    except KeyboardInterrupt:
        print("Servidor encerrado.")
    finally:
        if server_socket:
            server_socket.close()

if __name__ == "__main__":
    main_servidor()
