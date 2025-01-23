const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUsers } = require("../database/database");
const { logToFile } = require("../utils/LogToFile");

const AuthLogin = async (res, req) => {
    const { email, password } = req.body;
    

    if (!email) {
        return res.status(404).json({ error: "O email é obrigatório" });
    }
    if (!password) {
        return res.status(404).json({ error: "A senha é obrigatória" });
    }

    const users = await getUsers((err, users) => {
        if (err) {
            console.log('Erro ao consultar usuarios: ', err)
            logToFile('Erro ao consultar usuarios: ', err)
        }
        return users
    })

    let userData = {
        id: 0,
        name: '',
        email: '',
        password: ''
    }

    const filtredUser = users.filter(userss => userss.email == email)

    filtredUser.map(data=> { 
        userData = data
    })

    if (!filtredUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const checkPassword = await bcrypt.compare(password, userData.password);

    if (!checkPassword) {
        return res.status(404).json({ error: "A senha é invalída" });
    }

    try {
        const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const token = jwt.sign(
            {
                id: userData.id,
            },
            secret
        );

        return res.status(200).json({id: userData.id, name: userData.name, token });
    } catch (error) {
        return res.status(404).json({ error: error });
    }
}

module.exports = { AuthLogin }