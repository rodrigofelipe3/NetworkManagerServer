const { GetAllComputer, UpdateStatus } = require("../database/database")
const logToFile = require("../utils/LogToFile")

const HeartBeat = (hostname, lastHB) => { 
    GetAllComputer((err, rows)=> { 
        if(err){ 
            logToFile("Erro ao procurar computador" + err)
        }else { 
            console.log(rows)
            const hostName = rows.map((pcs)=> pcs.hostname == hostname)
            UpdateStatus("Conectado",hostName, lastHB)
            console.log("HeartBeat Recebido com Sucesso!")
            logToFile("HeartBeat Recebido com sucesso!")
        }
    })
}

module.exports = HeartBeat