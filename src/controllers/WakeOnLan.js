const wol = require("wake_on_lan");
const { logToFile } = require("../utils/LogToFile");

const WakeOnLan = (mac, ip) => {
  return new Promise((resolve, reject) => {
    wol.wake(mac, { address: ip }, (err) => {
      if (err) {
        logToFile("Houve um erro ao enviar pacotes: " + err);
        resolve({ok: false, error: err})
      } else {
        
        const magic_packet = wol.createMagicPacket(mac);
        console.log(magic_packet)
        resolve({ ok: true, msg: "Wake on Lan enviado com sucesso!" });
      }
    });
  });

};

module.exports = { WakeOnLan };
