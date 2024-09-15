const fetch = require("node-fetch");

const sendNewTime = async (newTime) => {
    try {
        const response = await fetch(`http://localhost:5001/api/updateSchedule/${newTime}`, {
            method: 'POST'
        });

        const data = await response.json();
        logToFile(`Resposta do servidor: ${JSON.stringify(data)}`);
    } catch (error) {
        logToFile(`Erro na requisição POST: ${error.message}`);
    }
};

module.exports = sendNewTime;
