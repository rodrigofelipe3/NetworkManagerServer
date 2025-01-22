const sqlite3 = require("sqlite3").verbose();
const xlsx = require("xlsx");
const fs = require("fs");
const { logToFile } = require("../utils/LogToFile");

const bytesToGigabytes = (bytes) => {
  const gigabytes = bytes / 1024 ** 3;
  return gigabytes;
};

const Report = () => {
  const db = new sqlite3.Database("./database.db");

  const getCurrentDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adiciona zero à esquerda, se necessário
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  const baseTableName = "report";

  const tableName = `${baseTableName}_${getCurrentDateTime()}`;
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        `SELECT host, processor, memory, hard_disk, operating_system, arch, monitors, user, poweroffhour FROM pcs`,
        (err, rows) => {
          if (err) {
            logToFile(err.message);
            resolve({ ok: false, error: err });
          }
          const presetColumns = rows.map((row) => ({
            Host: row.host,
            Usuario: row.user,
            Processador: row.processor,
            Memoria: bytesToGigabytes(row.memory).toFixed(2) + "GB",
            SSD: row.hard_disk,
            SO: row.operating_system,
            Arch: row.arch,
            Monitores: row.monitors,
            Hr_Desl: row.poweroffhour,
          }));

          const worksheet = xlsx.utils.json_to_sheet(presetColumns);

          const numCols = Object.keys(presetColumns[0]).length;

          xlsx.utils.sheet_add_aoa(
            worksheet,
            [["Relatório de Configurações"]],
            { origin: "A1" }
          );

          worksheet["!merges"] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: numCols - 1 } },
          ];
          
          xlsx.utils.sheet_add_aoa(
            worksheet,
            [
              [
                "Host",
                "Usuario",
                "Processador",
                "Memoria",
                "SSD",
                "SO",
                "Arch",
                "Monitores",
                "Hr. Desligar",
              ],
            ],
            { origin: "A2" }
          );
          
          xlsx.utils.sheet_add_json(worksheet, presetColumns, {
            origin: "A3",
            skipHeader: true,
          });

          const workbook = {
            SheetNames: ["Dados"],
            Sheets: {
              Dados: worksheet,
            },
          };

          const filePath = `./reports/${tableName}.xlsx`;
          xlsx.writeFile(workbook, filePath);

          resolve({ ok: true, msg: "Relatório Gerado com sucesso!" });
        }
      );
    });
  });
};

module.exports = Report;
