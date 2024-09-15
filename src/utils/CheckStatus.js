const { GetAllComputer, UpdateStatusToOff } = require("../database/database");
const logToFile = require("./LogToFile");

const TIMEOUT = 90000;
const CheckStatus = () => {
  const currentTime = Date.now();
  GetAllComputer((err, rows) => {
    if (err) {
      logToFile("Erro ao procurar computador" + err);
    } else {
      rows.map((pcs) => {
        const lastHbAsInt = new Date(pcs.lasthb).getTime();
        
        if (currentTime - lastHbAsInt > TIMEOUT && pcs.status === "Conectado") {
                UpdateStatusToOff("Offline", pcs.host);
        }
      });
    }
  });
};

module.exports = CheckStatus;
