const { log } = require("electron-builder");
const { logToFile } = require("../utils/LogToFile");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");
//const db = new sqlite3.Database('C:/Users/Rodrigo/Documents/Programação/ManagerShutdownNetwork/dist/database.db');

const createTableIfNotExist = () => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS pcs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    host TEXT NOT NULL,
                    processor TEXT NOT NULL,
                    memory INTEGER NOT NULL,
                    operating_system TEXT NOT NULL,
                    arch TEXT NOT NULL,
                    release TEXT NOT NULL,
                    ip TEXT UNIQUE NOT NULL,
                    mac_address TEXT UNIQUE NOT NULL,
                    network_devices TEXT,
                    status TEXT,
                    lasthb DATE
                )`,
      (err) => {
        if (err) {
          logToFile("Erro ao criar a tabela:" + err.message);
        }
      }
    );
  });
};

const RegisterComputerDB = (
  host,
  processor,
  memory,
  operating_system,
  arch,
  release,
  ip,
  mac_adress,
  network_devices,
  status,
  lastHB
) => {
  db.serialize(() => {
    console.log(network_devices);
    db.get("SELECT * FROM pcs WHERE host = ?", [host], (err, row) => {
      if (err) {
        logToFile(
          "Erro ao verificar se o computador já está registrado: " + err.message
        );
        return false;
      }

      if (row) {
        // O computador já foi registrado
        db.run(
          "UPDATE pcs SET processor = ?, memory = ? , operating_system = ?, arch =?, release =?, ip = ?, mac_address=?, network_devices = ?, status = ?, lasthb = ?  WHERE host = ?",
          [
            processor,
            memory,
            operating_system,
            arch,
            release,
            ip,
            mac_adress,
            network_devices,
            status,
            lastHB,
            host,
          ],
          (err) => {
            if (err) {
              logToFile("Erro ao atualizar o status: " + err.message);
              return false;
            } else {
              logToFile(
                `Status do computador ${host} atualizado para ${status}`
              );
              return true;
            }
          }
        );
      } else {
        db.run(
          "INSERT INTO pcs (host, processor, memory, operating_system, arch, release, ip, mac_address, network_devices, status, lasthb) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            host,
            processor,
            memory,
            operating_system,
            arch,
            release,
            ip,
            mac_adress,
            network_devices,
            status,
            lastHB,
          ],
          (err) => {
            if (err) {
              logToFile("Erro ao inserir dados: " + err.message);
              return false;
            } else {
              logToFile(`Computador ${host} registrado com sucesso.`);
              return true;
            }
          }
        );
      }
    });
  });
};

const GetAllComputer = (callback) => {
  db.all("SELECT * FROM pcs", [], (err, rows) => {
    if (err) {
      logToFile("Erro ao consultar dados:", err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

const GetComputerByIdDB = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM pcs WHERE id = ?", [id], (err, row) => {
      if (err) {
        logToFile("Houve um erro ao consultar o computador pelo ID: " + err);
        return resolve({ ok: false }); // Resolva a Promise com erro
      }
      return resolve({ ok: true, row: row }); // Resolva a Promise com o resultado
    });
  });
};

const UpdateStatus = (status, hostname, lastHB) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE pcs SET status = ?, lasthb = ? WHERE host = ?",
      [status, lastHB, hostname[0]],
      (err) => {
        if (err) {
          logToFile("Erro ao atualizar o status: " + err);
          resolve(false);
        }
        logToFile("HeartBeat Recebido com sucesso!");
        resolve(true);
      }
    );
  });
};

const UpdateStatusToOff = (status, hostname) => {
  db.run(
    "UPDATE pcs SET status = ? WHERE host = ?",
    [status, hostname],
    (err) => {
      if (err) {
        logToFile("Erro ao atualizar o status: " + err);
      }
      logToFile("Status Atualizado com Sucesso!");
    }
  );
};

const DeleteComputerDB = (ip) => { 
  return new Promise((resolve, reject)=> { 
    db.run("DELETE FROM pcs WHERE ip = ? ", [ip], (err)=> { 
      if(err){ 
          logToFile("Erro ao Deletar " + err)
          resolve({ok: false, error: err})
      }else { 
          logToFile("Computador deletado com sucesso!")
          resolve({ok: true, msg: "Computador deletado com sucesso!"})
      }
    })
  })
}
module.exports = {
  createTableIfNotExist,
  RegisterComputerDB,
  GetAllComputer,
  UpdateStatus,
  UpdateStatusToOff,
  GetComputerByIdDB,
  DeleteComputerDB
};
