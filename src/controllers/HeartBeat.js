const { GetAllComputer, UpdateStatus } = require("../database/database")
const {logToFile} = require("../utils/LogToFile")

const HeartBeat =  (hostname, lastHB) => { 
    console.log(hostname)
    return new Promise((resolve, reject)=> {
        GetAllComputer(async (err, rows)=> { 
            if(err){ 
                logToFile("Erro ao procurar computador" + err)
            }else { 
                const response =  await UpdateStatus("Conectado", hostname, lastHB)
                
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