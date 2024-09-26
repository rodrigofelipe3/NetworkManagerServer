const { GetComputerByIdDB } = require("../database/database")
const { logToFile } = require("../utils/LogToFile")
const GetComputerById = (id) => { 
    return new Promise( async (resolve, reject)=> { 
        try { 
            const response = await GetComputerByIdDB(id)
            if(response.ok == true) { 
                resolve({ok: true, row: response.row})
            } else { 
                resolve({ok: false})
            }
        }catch(err){ 
            logToFile(err)
            resolve({ok: false})
        }
    })
}

module.exports = { GetComputerById }