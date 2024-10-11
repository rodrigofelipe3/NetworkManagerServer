import socket
import struct
import cv2
import numpy as np

def receive_screenshots(host, port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind((host, port))
        sock.listen(1)

        print(f"Aguardando conexão de {host}:{port}...")
        conn, addr = sock.accept()

        with conn:
            print(f"Conectado a {addr}")

            while True:
                packed_msg_size = conn.recv(4)
                if not packed_msg_size:
                    break
                msg_size = struct.unpack(">L", packed_msg_size)[0]

                img_data = b""
                while len(img_data) < msg_size:
                    img_data += conn.recv(4096)

                nparr = np.frombuffer(img_data, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                # Exibe a imagem em tela cheia
                cv2.namedWindow("Remote Screen", cv2.WND_PROP_FULLSCREEN)
                cv2.setWindowProperty("Remote Screen", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)
                cv2.imshow("Remote Screen", img)

                key = cv2.waitKey(1) & 0xFF
                if key == ord('q') or key == 27:  # 'q' ou 'ESC'
                    break

    cv2.destroyAllWindows()

# Exemplo de uso: recebe na porta 5000
receive_screenshots(host="0.0.0.0", port=5000)
