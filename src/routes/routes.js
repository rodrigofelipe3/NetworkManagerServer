const express = require("express");
const RegisterComputer = require("../controllers/Register");
const { GetAllComputer, addUserDB, UpdatePowerOffState, UpdatePowerOfHours } = require("../database/database");
const HeartBeat = require("../controllers/HeartBeat");
const { logToFile } = require("../utils/LogToFile");
const router = express.Router();
const Report = require("../database/report")
const { GetComputerById, DeleteComputer } = require("../controllers/Computer");
const { WakeOnLan } = require("../controllers/WakeOnLan");
const { GetClientVersion } = require("../utils/GetClientVersion");


router.get('/', (req, res) => {
  try {
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ ok: false })
  }
})

router.get("/computers", (req, res) => {
  GetAllComputer((err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao consultar dados." });
    } else {
      return res.json(rows);
    }
  });
});

router.post("/registerComputer", async (req, res) => {
  const status = "Conectado"
  const response = await RegisterComputer(req, res, status);
  if (response.ok == true) {
    return res.status(200).json({ ok: true, msg: response.msg });
  } else if (response.ok == false && response.msg) {
    return res.status(200).json({ ok: true, msg: response.msg });
  } else {
    return res.status(500).json({ ok: false, error: response.error });
  }
});

router.post("/heartbeat/:name", async (req, res) => {
  const name = req.params.name;
  const lastHB = new Date(Date.now());
  try {
    const response = await HeartBeat(name, lastHB);
    if (response.ok == true) {
      return res.status(200);
    } else {
      return res.status(404);
    }
  } catch {
    return res.status(500);
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

router.delete("/deletecomputer/:ip", async (req, res) => {
  const ip = req.params.ip
  try {
    return await DeleteComputer(ip, res)
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Erro interno " + err })
  }
})

router.post("/wakeonlan", async (req, res) => {
  const { mac, ip } = req.body
  try {
    const response = await WakeOnLan(mac, ip)
    if (response.ok == true) {
      return res.status(200).json(response)
    } else {
      return res.status(500).json(response)
    }
  } catch (err) {
    return res.status(500).json({ ok: false, error: err })
  }
})

router.post("/adduser", async (req, res) => {
  const { user, ip } = req.body
  try {
    const response = await addUserDB(user, ip)
    if (response.ok == true) {
      return res.status(200).json({ ok: true, msg: response.msg })
    } else {
      return res.status(404).json({ ok: false, error: response.error })
    }
  } catch (err) {
    logToFile(err)
    return res.status(500).json({ ok: false, error: err })
  }
})

router.put("/updatepoweroff", async (req, res) => {

  const { poweroff, poweroffhour, ip } = req.body
  console.log(poweroff, poweroffhour, ip)
  try {
    const response = await UpdatePowerOffState(poweroff, poweroffhour, ip)
    if (response.ok == true) {
      return res.status(200).json({ ok: true, msg: response.msg })
    } else {
      return res.status(404).json({ ok: false, error: response.error })
    }
  } catch (err) {
    logToFile(err)
    return res.status(500).json({ ok: false, error: err })
  }

})

router.post("/report", async (req, res) => {
  try {
    const response = await Report()
    if (response.ok == true) {
      return res.status(200).json({ ok: true, msg: response.msg })
    } else {
      return res.status(404).json({ ok: false, error: response.error })
    }
  } catch (err) {
    return res.status(500).json({ ok: false, error: err })
  }
})

router.post('/updates', async (req, res)=> { 
  const config = await GetClientVersion()
  const version = JSON.parse(config)
  console.log(version)
    try { 
      return res.status(200).json({ok: true, version: version.version, filepath: version.filepath, instalationpath: version.instalationpath})
    }catch(err){ 
      console.log(err)
      return res.status(500).json({ok: false, data: err})
    }
    
})

module.exports = router;
