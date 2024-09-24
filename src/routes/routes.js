const express = require("express");
const RegisterComputer = require("../controllers/Register");
const { GetAllComputer } = require("../database/database");
const HeartBeat = require("../controllers/HeartBeat");
const { logToFile } = require("../utils/LogToFile");
const { GetScreen } = require("../controllers/getScreen");
const router = express.Router();
const si = require("systeminformation");

router.get("/computers", (req, res) => {
  GetAllComputer((err, rows) => {
    if (err) {
      res.status(500).json({ error: "Erro ao consultar dados." });
    } else {
      res.json(rows); // Retorna os dados em JSON
    }
  });
});

router.post("/registerComputer", (req, res) => {
  const response = RegisterComputer(req, res);
  if (response == true) {
    return res.status(200);
  } else {
    return res.status(500);
  }
});

router.post("/heartbeat/:name", (req, res) => {
  const  name  = req.params.name;
  const lastHB = new Date(Date.now());
  console.log(name)
  try {
    HeartBeat(name, lastHB);

    return res.status(200).json({ msg: "HeartBeat Recebido com sucesso!" });
  } catch {
    return res.status(500).json({ error: "Houve um erro" + error });
  }
});

router.post("/get/screen/:URL", async (req, res) => {
  const { URL } = req.params;

  const netData = await si.networkInterfaces();
  let machineIP = "";

  netData.forEach((iface) => {
    if (iface.ip4 && !iface.internal) {
      machineIP = iface.ip4;
    }
  });
  
  const SERV = machineIP;

  try { 
    const response = await fetch(`http://${URL}:5001/api/share/screen/${SERV}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    GetScreen();
  }catch(err){ 
    return logToFile("Erro na rota de GETSCREEN: " + err)
  }

});
module.exports = router;
