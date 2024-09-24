const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const robot = require("robotjs");
const GlobalKeyboardListener = require("node-global-key-listener").GlobalKeyboardListener;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 8080;

// Inicia o listener de teclado global
const keyboardListener = new GlobalKeyboardListener();

// Conexão do socket
io.on("connection", (socket) => {
  console.log("Cliente conectado.");

  // Captura o movimento do mouse
  setInterval(() => {
    const mousePos = robot.getMousePos();
    socket.emit("mouseMove", { x: mousePos.x, y: mousePos.y });
  }, 100);

  // Escuta eventos de teclas pressionadas
  keyboardListener.addListener((event) => {
    const key = event.key;
    console.log(key)
    if (key) {
      console.log(`Tecla pressionada: ${key}`);
      socket.emit("keyboard", { key: key });
    } else {
      console.log("Tecla pressionada: undefined");
    }
  });
});

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`Servidor do administrador aguardando conexões na porta ${PORT}`);
});
