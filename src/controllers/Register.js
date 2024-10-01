const { RegisterComputerDB } = require("../database/database")
const {logToFile} = require("../utils/LogToFile")

const RegisterComputer = (req, res)=> { 
    const {host , processor, memory, operating_system, arch, release, ip, mac_address, network_devices} = req.body;
    const status = "Conectado"
    const lastHB = new Date(Date.now())
    if(!ip){ 
        logToFile("Não foi enviado o IP")
        return
    }
    if(!host){ 
        logToFile("Não foi enviado o Hostname")
        return 
    }
    if(!mac_address){ 
        logToFile("Não foi enviado o MAC")
        return
    }
    if(!status){ 
        logToFile("Não foi enviado o Hostname")
        return
    }
    try{
        const response = RegisterComputerDB(host , processor, memory, operating_system, arch, release, ip, mac_address, network_devices,status, lastHB)  
        if (response == true) { 
            logToFile(host + " " + ip + " " + " " + mac_address + " " + "Registrado com sucesso!")
            return true
        } else { 
            logToFile("Erro ao registrar ")
            return false
        }
    }catch (err){ 
        logToFile("Erro ao registrar " + err)
        return false
    }
}

module.exports= RegisterComputer