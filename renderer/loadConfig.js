const fs = require("fs");

const createConfigJson = (serverIP) => {
  try {
    fs.readFile("./config.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        console.log(err);
      }
      let JSONData = JSON.parse(data)
      const config = {
        serverIP: String(serverIP), // Define o IP recebido na função
        startIP: String(JSONData.startIP),
        endIP:String(JSONData.endIP)
      };
      fs.writeFile("./config.json", JSON.stringify(config, null, 4), (err) => {
        if (err) {
          console.error("Erro ao criar o arquivo config.json:", err);
        } else {
          console.log("Arquivo config.json criado com sucesso!");
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// Função para realizar solicitações a uma faixa de IPs
const findIpResponse = async () => {
  const { serverIp, startIP, endIP } = await loadConfig();
  if (startIP != undefined) {
    const ipToInt = (ip) =>
      ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0);
    const intToIP = (int) =>
      [
        (int >>> 24) & 255,
        (int >>> 16) & 255,
        (int >>> 8) & 255,
        int & 255,
      ].join(".");

    const startInt = ipToInt(startIP);
    const endInt = ipToInt(endIP);
    let found = false;

    console.log(`Buscando resposta entre os IPs ${startIP} e ${endIP}...`);

    for (let i = startInt; i <= endInt; i++) {
      const ipAtual = intToIP(i);
      const url = `http://${ipAtual}:${3000}`;
      console.log(`Tentando: ${url}`);

      try {
        // Controlando timeout manualmente
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 100); // Timeout de 2 segundos

        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });

        clearTimeout(timeout); // Limpar timeout se a requisição terminar
        console.log(response);        if (response.status == 200) {
          console.log(`SERVIDOR RESPONDEU no IP: ${ipAtual}`);
          createConfigJson(ipAtual);
          found = true;
          break; // Interrompe o loop
        } else {
          console.log(`Resposta inválida de: ${ipAtual}`);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(`Timeout na requisição para: ${ipAtual}`);
        } else {
          console.log(
            `Erro ao tentar conectar em: ${ipAtual} - ${error.message}`
          );
        }
      }
    }

    if (!found) {
      console.log("Nenhuma resposta encontrada no intervalo.");
    }

    return found;
  }
};

async function loadConfig() {
  const configPath = "./config.json";

  try {
    const data = fs.readFileSync(configPath, "utf8");
    const config = JSON.parse(data);
    return {
      serverIP: config.serverIP,
      startIP: config.startIP,
      endIP: config.endIP,
    };
  } catch (error) {
    console.error("Erro ao carregar o arquivo config.json:", error);
    findIpResponse();
  }
}

module.exports = {findIpResponse, loadConfig}
