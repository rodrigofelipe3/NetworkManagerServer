const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUsers } = require("../database/database");
const { logToFile } = require("../utils/LogToFile");

const AuthLogin = async (email, password) => {
    

    if (!email) {
        return { ok: false, error: "O email é obrigatório" };
    }
    if (!password) {
        return { ok: false, error: "A senha é obrigatória" };
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
        return { ok: false, error: "Usuário não encontrado" };
    }
    const checkPassword = await bcrypt.compare(password, userData.password);

    if (!checkPassword) {
        return { ok: false, error: "A senha é inválida" };
    }

    try {
        const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const token = jwt.sign(
            {
                id: userData.id,
            },
            secret
        );

        return {ok: true, msg: 'Usuário logado com sucesso!', id: userData.id, name: userData.name, token }
    } catch (error) {
        return { ok: false, error: "Erro no servidor!" };
    }
}

module.exports = { AuthLogin }