const bcrypt = require("bcrypt");
const { getUsers, InsertUserDB } = require("../database/database");

const CreateAccount = async ( req, res) => {
    
    const {
        name, email,password, confirmpassword
    } = req.body;
    console.log(name, email, password, confirmpassword)
    if (!name) {
        return {ok: false, error: "O name não pode ser vazio ou nulo" }
    }
    if (!email) {
        return {ok: false, error: "O email não pode ser vazio ou nulo" }
    }
    if (!password) {
        return {ok: false, error: "A senha não pode ser vazia ou nula" }
    }
    if (!confirmpassword) {
        return {ok: false, error: "A confirmação de senha não pode ser vazia ou nula" }
        }
    if (confirmpassword != password) {
       return {ok: false, error: "As senhas devem ser iguais" }
    }

    //Verificar se o usuário já existe
    const UserExist = await getUsers((err, users) => {
        if (err) {
            console.log('Erro ao consultar usuarios: ', err)
            logToFile('Erro ao consultar usuarios: ', err)
        }
        return users.filter((data)=> {return data.email == email? email : ''})
        
    })

    
    
    if (Array.isArray(UserExist) && UserExist && !UserExist.length == 0 ) {
       return {ok: false, error: "O usuário já existe" }
    }
    const salt = await bcrypt.genSalt(12);
    const passWordHash = await bcrypt.hash(password, salt);
    //Tratamento caso haja algum erro ao tentar executar a função.
    try {
        //Salvando o usuário no Banco de Dados
        const response = await InsertUserDB(name, email, passWordHash)
        if(response.ok == true) { 
            return {ok: true, msg: 'Usuário cadastrado!'}
        }else { 
           return {ok: false, msg: 'Usuário ja existe!!'}
        }
    } catch (err) {
        return {ok: false, error: "Houve um erro " + err }
    }
}

module.exports = { CreateAccount }