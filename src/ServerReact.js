const express = require("express")
const path = require("path")
const app = express()

const PORT = 3000

console.log(path.join(__dirname,'../', "renderer", 'build'))

app.use(express.static(path.join(__dirname, '../', "renderer", 'build')));

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname,'../', "renderer", 'build', 'index.html'));
  });
  
app.listen(PORT, () => {
    console.log(`Servidor React rodando na porta http://localhost:${PORT}`);
});
