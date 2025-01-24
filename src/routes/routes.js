const express = require("express");
const RegisterComputer = require("../controllers/Register");
const { GetAllComputer, addUserDB, UpdatePowerOffState, DeleteUserDB, InsertUserDB } = require("../database/database");
const HeartBeat = require("../controllers/HeartBeat");
const { logToFile } = require("../utils/LogToFile");
const router = express.Router();
const Report = require("../reports/report")
const { GetComputerById, DeleteComputer } = require("../controllers/Computer");
const { WakeOnLan } = require("../controllers/WakeOnLan");
const { GetClientVersion } = require("../utils/GetClientVersion");
const jwt = require("jsonwebtoken");
const { AuthLogin } = require("../controllers/Auth");
const { CreateAccount } = require("../controllers/CreateAccount");



const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(400).json({ msg: "Token Inválido!" });
  }
};



router.get('/', (req, res) => {
  try {
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ ok: false })
  }
})


router.post("/auth/", async (req, res) => {

  const { email, password } = req.body
  console.log(email, password)
  try {
    const response = await AuthLogin(email, password)
    console.log(response)
    if (response.ok == true) {
      return res.status(200).json({ ok: true, msg: response.msg, token: response.token })
    } else {
      return res.status(404).json({ ok: false, error: response.error })
    }
  } catch (err) {
    return res.status(500).json({ ok: false, error: err })
  }

});


router.get("/computers", checkToken, (req, res) => {
  GetAllComputer((err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao consultar dados." });
    } else {
      return res.json(rows);
    }
  });
});




router.post("/registerComputer", async (req, res) => {
  const response = await RegisterComputer(req, res);
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

router.get("/computerbyid/:id", checkToken, async (req, res) => {
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

router.delete("/deletecomputer/:ip", checkToken, async (req, res) => {
  const ip = req.params.ip
  try {
    return await DeleteComputer(ip, res)
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Erro interno " + err })
  }
})

router.delete("/deleteuser/:id", checkToken, async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    const response = await DeleteUserDB(id)
    return res.status(200).json({ ok: response.ok, msg: response.msg })
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Erro interno " + err })
  }
})

router.post("/wakeonlan", checkToken, async (req, res) => {
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

router.post("/adduser", checkToken, async (req, res) => {
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

router.post("/createUser", checkToken, async (req, res) => {
  
  try {
    const response = await CreateAccount( req, res)
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

router.put("/updatepoweroff", checkToken, async (req, res) => {

  const { poweroff, poweroffhour, ip } = req.body
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

router.post("/report", checkToken, async (req, res) => {
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

router.post('/updates', async (req, res) => {
  const config = await GetClientVersion()
  const version = JSON.parse(config)
  try {
    return res.status(200).json({ ok: true, version: version.version, filepath: version.filepath, instalationpath: version.instalationpath })
  } catch (err) {
    return res.status(500).json({ ok: false, data: err })
  }

})

module.exports = router;
