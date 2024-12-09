const wol = require("wake_on_lan");
const { logToFile } = require("../utils/LogToFile");

const WakeOnLan = (mac, ip) => {
  
  return new Promise((resolve, reject) => {
    wol.wake(mac, (err) => {
      if (err) {
        logToFile("Houve um erro ao enviar pacotes: " + err);
        resolve({ok: false, error: err})
      } else {
        
        resolve({ ok: true, msg: "Wake o Lan enviado com sucesso!" });
      }
    });
  });

};

module.exports = { WakeOnLan };
