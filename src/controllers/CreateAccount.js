const bcrypt = require("bcrypt");
const { getUsers, InsertUserDB } = require("../database/database");

const CreateAccount = async (name, email,password, confirmpassword, req, res) => {
    
   
    console.log(name, email, password, confirmpassword)
    if (!name) {
        return res.status(404).json({ error: "O name não pode ser vazio ou nulo" });
    }
    if (!email) {
        return res.status(404).json({ error: "O email não pode ser vazio ou nulo" });
    }
    if (!password) {
        return res
            .status(404)
            .json({ error: "A senha não pode ser vazia ou nula" });
    }
    if (!confirmpassword) {
        return res
            .status(404)
            .json({ error: "A confirmação de senha não pode ser vazia ou nula" });
    }
    if (confirmpassword != password) {
        return res.status(404).json({ error: "As senhas devem ser iguais" });
    }

    //Verificar se o usuário já existe
    const UserExist = await getUsers((err, users) => {
        if (err) {
            console.log('Erro ao consultar usuarios: ', err)
            logToFile('Erro ao consultar usuarios: ', err)
        }
        const user = users.map((data)=> data.email == email? email : null)
        return user
    })

    console.log(UserExist)

    if (UserExist) {
        return res.status(422).json({ error: "O usuário já existe" });
    }
    const salt = await bcrypt.genSalt(12);
    const passWordHash = await bcrypt.hash(password, salt);
    //Tratamento caso haja algum erro ao tentar executar a função.
    try {
        //Salvando o usuário no Banco de Dados
        const response = await InsertUserDB(name, email, passWordHash)
        if(response.ok == true) { 
            return res.json(200).json({ok: true, msg: 'Usuário cadastrado!'})
        }else { 
            return res.json(200).json({ok: false, msg: 'Usuário ja existe!!'})
        }
    } catch (err) {
        return res.status(500).json({ error: "Houve um erro " + err });
    }
}

module.exports = { CreateAccount }