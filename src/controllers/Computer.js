const { GetComputerByIdDB, DeleteComputerDB } = require("../database/database")
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

const DeleteComputer = async (ip, res) => { 
    try { 
        const response = await DeleteComputerDB(ip)
        if(response.ok == true){
            logToFile(response.msg)
            return res.status(200).json(response)
        }else { 
            logToFile(response.error)
            return res.status(500).json(response)
        }
    }catch(err){ 
        return res.status(500).json({ok: false, error: err})
    }
}



module.exports = { GetComputerById, DeleteComputer}