const { logToFile } = require("../utils/LogToFile");
const sqlite3 = require("sqlite3").verbose();


// Inicializar banco de dados
const db = new sqlite3.Database('C:\\Program Files\\AdminNetwork Power Manager\\Server\\database\\database.db', (err) => { 
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
                );`,
      (err) => {
        if (err) {
          console.log("Erro ao criar a tabela de Computadores:" + err)
          logToFile("Erro ao criar a tabela de Computadores:" + err.message);
        }
        console.log('Tabela de PCS Criada!')
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    password INTEGER NOT NULL
                );`,
      (err) => {
        if (err) {
          console.log("Erro ao criar a tabela de Usuários:" + err)
          logToFile("Erro ao criar a tabela de Usuários:" + err.message);
        }
        console.log('Tabela de Usuários Criada!')
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS periphals (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    data DATE NOT NULL,
                    product VARCHAR(255) NOT NULL,
                    department VARCHAR(255) NOT NULL,
                    receiver_name VARCHAR(255) NOT NULL,
                    delivered_by VARCHAR(255) NOT NULL,
                    reason TEXT NOT NULL,
                    price REAL NOT NULL
                );`,
      (err) => {
        if (err) {
          console.log("Erro ao criar a tabela de Usuários:" + err)
          logToFile("Erro ao criar a tabela de Usuários:" + err.message);
        }
        console.log('Tabela de periféricos Criada!')
      }
    );
  });
};

const getUsers = (callback) => {
  const query = "SELECT * FROM users";
  return new Promise((resolve, reject)=> { 
    db.all(query, [], (err, rows) => {
      if (err) {
          console.error(err.message);
          logToFile('Erro ao consultar usuários: ', err)
          reject(callback(err, null));
      }
      resolve(callback(null, rows));
  });
  })
    
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
  powerstatus,
  status,
  lastHB
) => {
  
  return new Promise((resolve, reject) => {
    db.serialize(() => {

      db.get("SELECT * FROM pcs WHERE ip = ?", [ip], (err, row) => {
        if (err) {
          console.log('Erro ao selecionar: ', err)
          logToFile(
            "Erro ao verificar se o computador já está registrado: " + err.message
          );
          return false;
        }

        if (row) {
          // O computador já foi registrado
          db.run(
            "UPDATE pcs SET processor = ?, memory = ? , hard_disk = ? , operating_system = ?,  arch =?,  release =?, monitors = ? ,host = ?, mac_address=?, network_devices = ?, poweroff = 0, powerstatus = ?, status = ?, lasthb = ?  WHERE ip = ?",
            [
              processor,
              memory,
              hard_disk,
              operating_system,
              arch,
              release,
              monitors,
              host,
              mac_address,
              network_devices,
              powerstatus,
              status,
              lastHB,
              ip,
            ],
            (err) => {
              if (err) {
                logToFile("Erro ao atualizar o status: " + err.message);
                console.log("Erro ao atualizar o status: " + err.message);
                resolve({ok: false, error: err});
              } else {
                console.log(`Status do computador ${host} atualizado para ${status}`)
                logToFile(
                  `Status do computador ${host} atualizado para ${status}`
                );
                console.log("Computador atualizado.")
                resolve({ok: false, msg: "Computador atualizado."});
              }
            }
          );
        } else {
          db.run(
            "INSERT INTO pcs (host, processor, memory, hard_disk, operating_system, arch, release, monitors, ip, mac_address, network_devices,  powerstatus, status, lasthb) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
              powerstatus,
              status,
              lastHB
            ],
            (err) => {
              if (err) {
                logToFile("Erro ao inserir dados: " + err.message);
                resolve({ ok: false, error: err })
              } else {
                console.log("Computador registrado com sucesso!")
                resolve({ ok: true, msg: "Computador registrado com sucesso!" });
              }
            }
          );
        }
      });
    });
  })
};

const InsertUserDB = (name, email, password) => { 
    return new Promise((resolve, reject)=> { 
        db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err)=> { 
          if (err) { 
            console.log('Erro ao inserir usuário no banco de dados: ', err)
            reject({ok: false, err: 'Erro ao inserir usuário no banco de dados: ' + err})
          }
          resolve({ok: true, msg: 'Usuário criado com sucesso!'})
        })
    })
      
}

const InsertPeriphals = (data, product, department, delivered_by, receiver_name, reason, price) => {
  return new Promise((resolve, reject)=> { 
    db.run(
      "INSERT INTO periphals (data, product, department, delivered_by, receiver_name, reason, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        data, product, department, delivered_by, receiver_name, reason, price
      ],
      (err) => {
        if (err) {
          logToFile("Erro ao inserir dados: " + err.message);
          console.log(err)
          reject({ ok: false, error: err })
        } else {
          console.log("Periferico inserido com sucesso!")
          resolve({ ok: true, msg: "Periferico inserido com sucesso!" });
        }
      }
    );
  }) 
  
}

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

const GetPeriphals = (callback) => {
  db.all("SELECT * FROM periphals", [], (err, rows) => {
    if (err) {
      console.log('Erro ao consultar dados Periphals ', err)
      logToFile("Erro ao consultar dados Periphals:", err.message);
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

const UpdateStatus = (status, lastHB, powerstatus, hostname) => {
  
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE pcs SET status = ?, lasthb = ?, powerstatus = ? WHERE host = ?",
      [status, lastHB, powerstatus, hostname],
      (err) => {
        if (err) {
          console.log("erro ao atualizar status HEARTBEAT")
          logToFile("Erro ao atualizar o status: " + err);
          resolve(false);
        }
        resolve(true);
      }
    );
  });
};

const UpdateStatusToOff = (status, hostname) => {
  console.log(status, hostname)
  db.run(
    "UPDATE pcs SET status = ?, powerstatus = 0 WHERE host = ?",
    [status,hostname],
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
    console.log('Deletando PC: ', ip)
    db.run("DELETE FROM pcs WHERE ip = ? ", [ip], (err) => {
      if (err) {
        console.log(err)
        logToFile("Erro ao Deletar " + err)
        resolve({ ok: false, error: err })
      } else {
        console.log("Computador deletado com sucesso! ", ip)
        resolve({ ok: true, msg: "Computador deletado com sucesso!" })
      }
    })
  })
}

const DeleteUserDB = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE id = ? ", [id], (err) => {
      if (err) {
        console.log("Erro ao Deletar Usuário " + err)
        logToFile("Erro ao Deletar Usuário " + err)
        resolve({ ok: false, error: err })
      } else {
        resolve({ ok: true, msg: "Usuário Deletado Com sucesso!" })
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
const addDepartmentDB = (department, ip) => { 
  return new Promise((resolve, reject)=>{
    db.run('UPDATE pcs SET department = ? WHERE ip = ?', [department, ip], (err)=> { 
      if(err){ 
        logToFile("Erro ao Atualizar o nome do Departamento" + err)
        console.log(err)
        resolve({ok: false, error: err})
      }else { 
        resolve({ok: true, msg: "Departamento atualizado com sucesso!"})
      }
    })
  })
}

module.exports = {
  addDepartmentDB,
  DeleteUserDB,
  InsertUserDB,
  getUsers,
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
  UpdatePowerOfHours,
  InsertPeriphals,
  GetPeriphals
};
