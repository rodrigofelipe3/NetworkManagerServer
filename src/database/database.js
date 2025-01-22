const { logToFile } = require("../utils/LogToFile");
const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');
const path = require('path');

// Garantir que o diretório existe
const databaseDir = path.join(__dirname);
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
  console.log('Diretório criado:', databaseDir);
}

// Caminho do banco de dados
const dbPath = path.join(databaseDir, 'database.db');
console.log('Caminho do banco de dados:', dbPath);

// Inicializar banco de dados
const db = new sqlite3.Database('./database.db', (err) => { 
  if (err) { 
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados bem-sucedida!');
  }
});

// Listener de erros
db.on('error', (err) => {
  console.error('Erro no banco de dados:', err.message);
});


const createTableIfNotExist = () => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS pcs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    host TEXT NOT NULL,
                    processor TEXT NOT NULL,
                    memory INTEGER NOT NULL,
                    hard_disk TEXT NOT NULL,
                    operating_system TEXT NOT NULL,
                    arch TEXT NOT NULL,
                    release TEXT NOT NULL,
                    monitors TEXT,
                    ip TEXT UNIQUE NOT NULL,
                    user TEXT,
                    mac_address TEXT UNIQUE NOT NULL,
                    network_devices TEXT,
                    poweroff INTEGER,
                    poweroffhour TEXT,
                    powerstatus BOOLEAN,
                    status TEXT,
                    lasthb DATE
                )`,
      (err) => {
        if (err) {
          console.log("Erro ao criar a tabela:" + err)
          logToFile("Erro ao criar a tabela:" + err.message);
        }
        console.log('Banco de dados Criado!')
      }
    );
  });
};
const RegisterComputerDB = (
  host,
  processor,
  memory,
  hard_disk,
  operating_system,
  arch,
  release,
  monitors,
  ip,
  mac_address,
  network_devices,
  poweroff,
  poweroffhour,
  powerstatus,
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
            "UPDATE pcs SET processor = ?, memory = ? , hard_disk = ? , operating_system = ?,  arch =?,  release =?, monitors = ? ,ip = ?, mac_address=?, network_devices = ?, poweroff = ?, poweroffhour =?, powerstatus = ?, status = ?, lasthb = ?  WHERE host = ?",
            [
              processor,
              memory,
              hard_disk,
              operating_system,
              arch,
              release,
              monitors,
              ip,
              mac_address,
              network_devices,
              poweroff,
              poweroffhour,
              powerstatus,
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
            "INSERT INTO pcs (host, processor, memory, hard_disk, operating_system, arch, release, monitors, ip, mac_address, network_devices, poweroff, poweroffhour, powerstatus, status, lasthb) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              host,
              processor,
              memory,
              hard_disk,
              operating_system,
              arch,
              release,
              monitors,
              ip,
              mac_address,
              network_devices,
              poweroff,
              poweroffhour,
              powerstatus,
              status,
              lastHB
            ],
            (err) => {
              if (err) {
                logToFile("Erro ao inserir dados: " + err.message);
                resolve({ ok: false, error: err })
              } else {
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
      console.log("Houve um erro ao consultar o computador pelo ID: " + err)
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
        console.log("Houve um erro ao consultar o computador pelo ID: " + err)
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
      [status, lastHB, hostname],
      (err) => {
        if (err) {
          logToFile("Erro ao atualizar o status: " + err);
          resolve(false);
        }
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
    }
  );
};

const UpdateOnPowerOff = (id, powerstatus) => {
  db.run(
    "UPDATE pcs SET powerstatus = ? WHERE id = ?",
    [powerstatus, id],
    (err) => {
      if (err) {
        logToFile("Erro ao atualizar o status: " + err);
      }
      console.log('Update powerstatus successful')
    }
  );
};

const UpdatePowerOffState = (poweroff, poweroffhour, ip) => { 
  return new Promise((resolve, reject)=> { 
    db.run(
      "UPDATE pcs SET poweroff = ?, poweroffhour = ? WHERE ip = ?",
      [poweroff, poweroffhour, ip],
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

const UpdatePowerOfHours = (ip, time) => { 
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE pcs SET poweroffhour = ? WHERE ip = ?",
      [time, ip],
      (err) => {
        if (err) {
          logToFile("Erro ao atualizar o status de desligamento: " + err);
          return reject(err);
        }
        console.log("Shutdown cancelado com sucesso!");
        resolve();
      }
    );
  });
};


const DeleteComputerDB = (ip) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM pcs WHERE ip = ? ", [ip], (err) => {
      if (err) {
        logToFile("Erro ao Deletar " + err)
        resolve({ ok: false, error: err })
      } else {
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
  UpdatePowerOffState,
  UpdateOnPowerOff,
  UpdatePowerOfHours
};
