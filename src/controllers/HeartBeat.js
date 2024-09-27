const { GetAllComputer, UpdateStatus } = require("../database/database")
const {logToFile} = require("../utils/LogToFile")

const HeartBeat =  (hostname, lastHB) => { 
    return new Promise((resolve, reject)=> {
        GetAllComputer(async (err, rows)=> { 
            if(err){ 
                logToFile("Erro ao procurar computador" + err)
            }else { 
                const hostName = rows.map((pcs)=> pcs.host == hostname? pcs.host : undefined)
                
                const response =  await UpdateStatus("Conectado",hostName, lastHB)
                
                if(response == true){ 
                    logToFile("HeartBeat Recebido com sucesso!")
                    resolve({ok: true})
                } else { 
                    resolve({ok: false})
                }
            }
        })
    })
}

module.exports = HeartBeat