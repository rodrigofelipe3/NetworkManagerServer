const express = require("express")
const app = express()
const route = require("./routes/routes")
const db = require("./database/database")
const cors = require("cors")
const CheckStatus = require("./utils/CheckStatus")
const logToFile = require("./utils/LogToFile")
const PORT = 5000
const corsOptions = { 
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE", "HEAD"],
    allowedHeaders: ["Content-Type"]
}
logToFile("Iniciando")
app.use(cors(corsOptions))
app.use(express.json());
app.use("/api", route)

db.createTableIfNotExist()

setInterval(CheckStatus, 10000)
app.listen(PORT, ()=> { 
    logToFile("Servidor rodando na porta 5000")
})