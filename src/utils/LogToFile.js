const fs = require('fs');
const path = require('path');

const logToFile = (message) => {
    //const logFilePath = path.join("C:/Users/Rodrigo/Documents/Programação/ManagerShutdownNetwork/dist/", 'log.txt');
    const logFilePath = path.join(__dirname, 'log.txt')
    const logMessage = `${new Date().toISOString()} - ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            
        } else {
            
        }
    });
};

module.exports = logToFile