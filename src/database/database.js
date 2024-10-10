const { log } = require("electron-builder");
const { logToFile } = require("../utils/LogToFile");
const path = require("path")
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

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
                    user TEXT,
                    mac_address TEXT UNIQUE NOT NULL,
                    network_devices TEXT,
                    poweroff INTEGER,
                    poweroffhour TEXT,
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
  poweroff,
  poweroffhour,
  user,
  status,
  lastHB
) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {

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
            "UPDATE pcs SET processor = ?, memory = ? , operating_system = ?, arch =?, release =?, ip = ?, mac_address=?, network_devices = ?, poweroff = ?, poweroffhour =?, status = ?, lasthb = ?  WHERE host = ?",
            [
              processor,
              memory,
              operating_system,
              arch,
              release,
              ip,
              mac_adress,
              network_devices,
              poweroff,
              poweroffhour,
              status,
              lastHB,
              host,
            ],
            (err) => {
              if (err) {
                logToFile("Erro ao atualizar o status: " + err.message);
                resolve({ok: false, error: err});
              } else {
                logToFile(
                  `Status do computador ${host} atualizado para ${status}`
                );
                resolve({ok: false, msg: "Computador atualizado."});
              }
            }
          );
        } else {
          db.run(
            "INSERT INTO pcs (host, processor, memory, operating_system, arch, release, ip, mac_address, network_devices, poweroff, poweroffhour, status, lasthb) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
              poweroff,
              poweroffhour,
              status,
              lastHB,
            ],
            (err) => {
              if (err) {
                logToFile("Erro ao inserir dados: " + err.message);
                resolve({ ok: false, error: err })
              } else {
                logToFile(`Computador ${host} registrado com sucesso.`);
                resolve({ ok: true, msg: "Computador registrado com sucesso!" });
              }
            }
          );
        }
      });
    });
  })
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

const UpdatePowerOffState = (poweroff, ip) => { 
  return new Promise((resolve, reject)=> { 
    db.run(
      "UPDATE pcs SET poweroff = ? WHERE ip = ?",
      [poweroff, ip],
      (err) => {
        if (err) {
          logToFile("Erro ao atualizar o status de desligamento: " + err);
          resolve({ok: false, error: err})
        }
        logToFile("Status Atualizado com Sucesso!");
        resolve({ok: true, msg: "Status atualizado no banco de dados"})
      }
    );
  })
}

const DeleteComputerDB = (ip) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM pcs WHERE ip = ? ", [ip], (err) => {
      if (err) {
        logToFile("Erro ao Deletar " + err)
        resolve({ ok: false, error: err })
      } else {
        logToFile("Computador deletado com sucesso!")
        resolve({ ok: true, msg: "Computador deletado com sucesso!" })
      }
    })
  })
}

const addUserDB = (user, ip) => { 
  return new Promise((resolve, reject)=>{
    db.run('UPDATE pcs SET user = ? WHERE ip = ?', [user, ip], (err)=> { 
      if(err){ 
        logToFile("Erro ao Atualizar o nome do USuário" + err)
        resolve({ok: false, error: err})
      }else { 
        resolve({ok: true, msg: "Usuário atualizado com sucesso!"})
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
  DeleteComputerDB,
  addUserDB,
  UpdatePowerOffState
};
