const fs = require('fs')
const { logToFile } = require('./LogToFile')


const GetClientVersion = async () => { 
    return new Promise(async (resolve, reject)=> { 
        try { 
            fs.readFile('./config.json', 'utf-8', (err, data)=> { 
                if(err) { 
                    reject(err)
                }
                resolve(data)
            })
        }catch(err){ 
            logToFile('Erro ao obter a versão do client' + err)
            resolve(err)
        }
    })
}

GetClientVersion()
module.exports = {GetClientVersion}