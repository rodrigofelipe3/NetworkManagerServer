const dgram = require('dgram');
const fs = require('fs');

const server = dgram.createSocket('udp4');
const port = 12345;
let receivedChunks = [];
let totalChunks = 0;

server.on('message', (msg, rinfo) => {
  const chunkIndex = msg[0]; // Índice do fragmento
  totalChunks = msg[1];      // Total de fragmentos
  const chunk = msg.slice(2); // O conteúdo do fragmento

  receivedChunks[chunkIndex] = chunk; // Armazena o fragmento no índice correto

  // Se todos os fragmentos foram recebidos, junta e salva a imagem
  if (receivedChunks.length === totalChunks && !receivedChunks.includes(undefined)) {
    const fullImage = Buffer.concat(receivedChunks);
    fs.writeFileSync(`frame-${Date.now()}.jpg`, fullImage);  // Salva o frame
    receivedChunks = [];  // Limpa os fragmentos para a próxima imagem
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor UDP escutando em ${address.address}:${address.port}`);
});

server.bind(port);
