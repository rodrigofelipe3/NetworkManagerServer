const dgram = require('dgram');
const fs = require('fs');

const server = dgram.createSocket('udp4');
const port = 12345;
let receivedChunks = [];
let totalChunks = 0;

server.on('message', (msg, rinfo) => {
  const chunkIndex = msg[0]; 
  totalChunks = msg[1];      
  const chunk = msg.slice(2); 

  receivedChunks[chunkIndex] = chunk; 


  if (receivedChunks.length === totalChunks && !receivedChunks.includes(undefined)) {
    const fullImage = Buffer.concat(receivedChunks);
    fs.writeFileSync(`frame-${Date.now()}.jpg`, fullImage); 
    receivedChunks = [];  
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor UDP escutando em ${address.address}:${address.port}`);
});

server.bind(port);
