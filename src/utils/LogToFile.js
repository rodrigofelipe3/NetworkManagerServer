const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'log.txt');

const clearLogFile = () => {
    if (fs.existsSync(logFilePath)) {
        fs.unlink(logFilePath, (err) => {
            if (err) {
                console.error('Erro ao apagar o arquivo de log:', err.message);
            } else {
                console.log('Arquivo de log apagado com sucesso.');
            }
        });
    } else {
        console.log('Nenhum arquivo de log encontrado.');
    }
};

const logToFile = (message) => {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo de log:', err.message);
        } else {
            console.log('Mensagem de log gravada com sucesso.');
        }
    });
};

module.exports = { logToFile, clearLogFile };
