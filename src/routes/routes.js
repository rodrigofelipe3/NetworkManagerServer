const express = require("express");
const RegisterComputer = require("../controllers/Register");
const { GetAllComputer } = require("../database/database");
const HeartBeat = require("../controllers/HeartBeat");
const { logToFile } = require("../utils/LogToFile");
const { GetScreen } = require("../controllers/getScreen");
const router = express.Router();
const si = require("systeminformation");
const { GetComputerById, DeleteComputer } = require("../controllers/Computer");
const { WakeOnLan } = require("../controllers/WakeOnLan");

router.get("/computers", (req, res) => {
  GetAllComputer((err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao consultar dados." });
    } else {
      return res.json(rows);
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

router.post("/heartbeat/:name", async (req, res) => {
  const name = req.params.name;
  const lastHB = new Date(Date.now());
  console.log(name);
  try {
    const response = await HeartBeat(name, lastHB);
    if (response.ok == true) {
      return res.status(200);
    }else { 
      return res.status(404);
    }
  } catch {
    return res.status(500);
  }
});

router.post("/get/screen/:URL", async (req, res) => {
  const { URL } = req.params;
  console.log(URL);
  const netData = await si.networkInterfaces();
  let machineIP = "";
  netData.forEach((iface) => {
    if (iface.iface == "Ethernet") {
      machineIP = iface.ip4;
    }
  });

  const SERV = machineIP;

  try {
    const response = await fetch(
      `http://${URL}:5001/api/share/screen/${SERV}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    GetScreen();
    return res.status(200);
  } catch (err) {
    return logToFile("Erro na rota de GETSCREEN: " + err);
  }
});

router.get("/computerbyid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await GetComputerById(id);
    if (response.ok == true) {
      return res.status(200).json({ msg: response.row });
    } else {
      return res.status(500).json({ error: "Não há computador com esse ID" });
    }
  } catch (err) {
    logToFile("Erro interno ao consultar computador pelo id: " + err);
    return res.status(500).json({ error: "Erro interno" });
  }
});

router.delete("/deletecomputer/:ip", async (req, res)=> { 
  const ip = req.params.ip
  try { 
    return await DeleteComputer(ip, res)
  }catch(err){ 
    return res.status(500).json({ok: false, error: "Erro interno " + err})
  }
})

router.post("/wakeonlan", async (req, res)=> { 
  const {mac, ip} = req.body 
  try { 
    const response = await WakeOnLan(mac, ip)
    if(response.ok == true) { 
      return res.status(200).json(response)
    }else { 
      return res.status(500).json(response)
    }
  }catch(err){ 
    return res.status(500).json({ok: false, error: err})
  }
})
module.exports = router;
