const express = require("express")
const app = express()

const PORT = 3000


app.use(express.static("C:/Program Files/TI Administration/build"));

app.get('*', (req, res) => {
    return res.sendFile("C:/Program Files/TI Administration/build/index.html");
  });
  
app.listen(PORT, () => {
    console.log(`Servidor React rodando na porta http://localhost:${PORT}`);
});
