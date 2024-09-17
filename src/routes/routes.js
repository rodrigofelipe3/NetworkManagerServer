const express = require("express")
const RegisterComputer = require("../controllers/Register");
const { GetAllComputer } = require("../database/database");
const HeartBeat = require("../controllers/HeartBeat");
const logToFile = require("../utils/LogToFile");
const router = express.Router()


router.get("/computers", (req, res)=> {
   GetAllComputer((err, rows) => {
      if (err) {
          res.status(500).json({ error: 'Erro ao consultar dados.' });
      } else {
          res.json(rows); // Retorna os dados em JSON
      }
  });
})

router.post("/registerComputer", (req, res)=> {
   const response = RegisterComputer(req, res)
   if(response == true){ 
        return res.status(200)
   }else { 
        return res.status(500)
   }
})

router.post("/heartbeat/:name", (req, res)=> {
    const {hostname} = req.params
    const lastHB = Date.now()
    try { 
        HeartBeat(hostname, lastHB)
       
        return res.status(200).json({msg: "HeartBeat Recebido com sucesso!"})
    }catch{ 
        return res.status(500).json({error: "Houve um erro" + error})
    }
   
 })
module.exports = router