const logToFile = require('../utils/LogToFile');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname, 'database.db')
//const db = new sqlite3.Database('C:/Users/Rodrigo/Documents/Programação/ManagerShutdownNetwork/dist/database.db');



const createTableIfNotExist = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS pcs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    host TEXT NOT NULL,
                    processor TEXT NOT NULL,
                    memory INTEGER NOT NULL,
                    operating_system TEXT NOT NULL,
                    arch TEXT NOT NULL,
                    release TEXT NOT NULL,
                    ip TEXT UNIQUE NOT NULL,
                    mac_address TEXT UNIQUE NOT NULL,
                    status TEXT,
                    lasthb DATE
                )`,
            (err) => {
                if (err) {
                    logToFile('Erro ao criar a tabela:' + err.message);
                }
            });
    });

}

const RegisterComputerDB = (host, processor, memory, operating_system, arch, release, ip, mac_adress, status, lastHB) => {
    db.serialize(() => {
       
        db.get("SELECT * FROM pcs WHERE host = ?", [host], (err, row) => {
            if (err) {
                logToFile('Erro ao verificar se o computador já está registrado: ' + err.message);
                return false;
            }

            if (row) {
                // O computador já foi registrado, então fazemos o UPDATE no status
                db.run("UPDATE pcs SET status = ?, lasthb = ?  WHERE host = ?", [status, lastHB, host], (err) => {
                    if (err) {
                        logToFile('Erro ao atualizar o status: ' + err.message);
                        return false;
                    } else {
                        logToFile(`Status do computador ${host} atualizado para ${status}`);
                        return true;
                    }
                });
            } else {
                db.run("INSERT INTO pcs (host, processor, memory, operating_system, arch, release, ip, mac_address, status, lasthb) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [host, processor, memory, operating_system, arch, release, ip, mac_adress, status, lastHB], (err) => {
                    if (err) {
                        logToFile('Erro ao inserir dados: ' + err.message);
                        return false;
                    } else {
                        logToFile(`Computador ${host} registrado com sucesso.`);
                        return true;
                    }
                });
            }
        });
    });
};

const GetAllComputer = (callback) => { 
    db.all("SELECT * FROM pcs", [], (err, rows) => { 
        if (err) {
            logToFile('Erro ao consultar dados:', err.message);
            callback(err, null); 
           
        }else { 
            callback(null, rows); 
        }
    })
}

const UpdateStatus = (status, hostname, lastHB) => { 
    db.run("UPDATE pcs SET status = ?, lasthb = ? WHERE host = ?", [status, lastHB, hostname], (err)=> { 
        if(err){ 
            logToFile("Erro ao atualizar o status: " + err)
        }
    })
}

const UpdateStatusToOff = (status, hostname) => { 

    db.run("UPDATE pcs SET status = ? WHERE host = ?", [status,  hostname], (err)=> { 
        if(err){ 
            logToFile("Erro ao atualizar o status: " + err)
        }
    })
}

module.exports = { 
    createTableIfNotExist,
    RegisterComputerDB,
    GetAllComputer,
    UpdateStatus,
    UpdateStatusToOff
}