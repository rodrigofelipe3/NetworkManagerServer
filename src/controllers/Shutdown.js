const fetch = require('node-fetch');
const logToFile = require('../utils/LogToFile');

const sendShutdownRequest = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/shutdown', {
      method: 'POST'
    });

    const data = await response.json();
    logToFile('Requisição de shutdown enviada com sucesso:', data);
  } catch (error) {
    logToFile('Erro ao enviar a requisição de shutdown:', error.message);
  }
};

module.exports = sendShutdownRequest;
