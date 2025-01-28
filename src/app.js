
const {createTableIfNotExist} = require("./database/database")
const express = require("express")
const app = express()
const route = require("./routes/routes")
const cors = require("cors")
const CheckStatus = require("./utils/CheckStatus")
const {logToFile, clearLogFile} = require("./utils/LogToFile")
const checkShutdownTime = require("./utils/scheduleShutdown")
const PORT = 5000

const PORT2 = 3000
const app2 = express()

app2.use(express.static('C:\\Program Files\\AdminNetwork Power Manager\\Server\\build\\'));

app2.get('*', (req, res) => {
    return res.sendFile('C:\\Program Files\\AdminNetwork Power Manager\\Server\\build\\index.html');
});

app2.listen(PORT2, ()=> { 
    console.log(`Servidor React rodando na porta http://localhost:${PORT2}`);
})
 
const corsOptions = { 
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
app.use(express.json());
app.use("/api", route)

createTableIfNotExist()
setInterval(checkShutdownTime, 30000)
setInterval(CheckStatus, 30000)
app.listen(PORT, (err)=> { 
    if(err){ 
        console.log(err)
    }
    clearLogFile()
    logToFile("Servidor rodando na porta 5000")
})