const fs = require('fs')
const { logToFile } = require('./LogToFile')
const configPath = 'C:\\Program Files\\AdminNetwork Power Manager\\Server\\config.json'

const GetClientVersion = async () => { 
    return new Promise(async (resolve, reject)=> { 
        try { 
            fs.readFile(configPath, 'utf-8', (err, data)=> { 
                if(err) { 
                    reject(err)
                }
                resolve(data)
            })
        }catch(err){ 
            console.log(err)
            logToFile('Erro ao obter a versão do client' + err)
            resolve(err)
        }
    })
}

module.exports = {GetClientVersion}