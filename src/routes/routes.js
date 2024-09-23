const express = require("express");
const RegisterComputer = require("../controllers/Register");
const { GetAllComputer } = require("../database/database");
const HeartBeat = require("../controllers/HeartBeat");
const logToFile = require("../utils/LogToFile");
const { GetScreen } = require("../controllers/getScreen");
const router = express.Router();
const ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath(
  "C:/ffmpeg-2024-09-19-git-0d5b68c27c-full_build/bin/ffmpeg.exe"
);



/*router.get("/stream", (req, res) => {
  try {
    //res.setHeader("Content-Type", "video/mp4");

    // Adicionar logs detalhados
    ffmpeg("udp://0.0.0.0:1234")
      .inputOptions("-f", "mpegts") // especifica que o formato de entrada é mpegts
      .videoCodec("libx264")
      .format("mpegts") // mude para mpegts em vez de mp4
      .output("udp://localhost:3000")
      .on("error", function (err) {
        console.log("Erro no stream: " + err.message);
      })
      .on("end", function () {
        console.log("Transmissão encerrada");
      })
      .run();
  } catch (err) {
    return res.status(404).json({ err });
  }
});*/

router.get("/computers", (req, res) => {
  GetAllComputer((err, rows) => {
    if (err) {
      res.status(500).json({ error: "Erro ao consultar dados." });
    } else {
      res.json(rows); // Retorna os dados em JSON
    }
  });
});

router.post("/registerComputer", (req, res) => {
  const response = RegisterComputer(req, res);
  if (response == true) {
    return res.status(200);
  } else {
    return res.status(500);
  }
});

router.post("/heartbeat/:name", (req, res) => {
  const { hostname } = req.params;
  const lastHB = new Date(Date.now());
  console.log(lastHB);
  try {
    HeartBeat(hostname, lastHB);

    return res.status(200).json({ msg: "HeartBeat Recebido com sucesso!" });
  } catch {
    return res.status(500).json({ error: "Houve um erro" + error });
  }
});

router.post("/get/screen/:URL/:SERV", async (req, res) => {
  const { URL, SERV } = req.params;

  const response = await fetch(
    `http://${URL}:5001/api/share/screen/${"127.0.0.1"}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  GetScreen();
});
module.exports = router;
