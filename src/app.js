const express = require("express")
const app = express()
const route = require("./routes/routes")
const {createTableIfNotExist} = require("./database/database")
const cors = require("cors")
const CheckStatus = require("./utils/CheckStatus")
const {logToFile, clearLogFile} = require("./utils/LogToFile")
const PORT = 5000
const corsOptions = { 
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE", "HEAD"],
    allowedHeaders: ["Content-Type"]
}

app.use(cors(corsOptions))
app.use(express.json());
app.use("/api", route)

createTableIfNotExist()

setInterval(CheckStatus, 10000)
app.listen(PORT, (err)=> { 
    if(err){ 
        console.log(err)
    }
    clearLogFile()
    logToFile("Servidor rodando na porta 5000")
})