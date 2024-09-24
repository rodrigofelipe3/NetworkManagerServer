const { GetAllComputer, UpdateStatus } = require("../database/database")
const {logToFile} = require("../utils/LogToFile")

const HeartBeat = (hostname, lastHB) => { 
    GetAllComputer((err, rows)=> { 
        if(err){ 
            logToFile("Erro ao procurar computador" + err)
        }else { 
            const hostName = rows.map((pcs)=> pcs.host == hostname? pcs.host : undefined)
            
            UpdateStatus("Conectado",hostName, lastHB)
            console.log("HeartBeat Recebido com Sucesso!")
            logToFile("HeartBeat Recebido com sucesso!")
        }
    })
}

module.exports = HeartBeat