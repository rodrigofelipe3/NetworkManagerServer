const fs = require('fs');
const path = require('path')
const pathToFile = path.join(__dirname, '../', 'log', 'log.txt')

const clearLogFile = () => {
    if (fs.existsSync('C:\\Program Files\\AdminNetwork Power Manager\\Server\\log\\log.txt')) {
        fs.unlink('C:\\Program Files\\AdminNetwork Power Manager\\Server\\log\\log.txt', (err) => {
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

    fs.appendFile('C:\\Program Files\\AdminNetwork Power Manager\\Server\\log\\log.txt', logMessage, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo de log:', err.message);
        } else {
            console.log('Mensagem de log gravada com sucesso.');
        }
    });
};

module.exports = { logToFile, clearLogFile };
