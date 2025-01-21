const wol = require("wake_on_lan");
const { logToFile } = require("../utils/LogToFile");

const WakeOnLan = (mac) => {
  
  return new Promise((resolve, reject) => {
    wol.wake(mac, (err) => {
      if (err) {
        logToFile("Houve um erro ao enviar pacotes: " + err);
        console.log(err)
        resolve({ok: false, error: err})
      } else {
        wol.createMagicPacket(mac)
        resolve({ ok: true, msg: "Wake o Lan enviado com sucesso!" });
      }
    });
  });

};

module.exports = { WakeOnLan };
