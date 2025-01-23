import { encryptData } from "./CriptoJs";


const GetIPAddress = () => { 
  
}

export const Authenticate = async (formLogin) => {
  window.api.GetAddressIP().then((serverIP)=> { 
    const url = `http://${serverIP}:5000/api/auth/`;
  console.log(url)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formLogin),
  };

  const response = fetch(url, options)
  .then( async response => await response.json())
  .then(async data => {
    if(data.error){
      
      return data
    }else { 
      console.log(data)
      sessionStorage.setItem("Nome", data.nome)
      sessionStorage.setItem("Access-Token", data.token)
      const encryptIdUser = encryptData(data.id)
      sessionStorage.setItem("Id", encryptIdUser)
      
      if(sessionStorage.getItem("Access-Token") === null || sessionStorage.getItem("Access-Token") === undefined){ 
        return false
      } else{ 
        return true
      }
     
    }
    
  }).catch((err)=> { 
    return {err: "Erro: " + err}
  })

  
  return response
  })
  
};

export const UserAuthenticated = () => { 
    return !sessionStorage.getItem('Access-Token')? false : true
}

export const ClienteAuthenticated = () => { 
  return !sessionStorage.getItem('Access-Token') && sessionStorage.getItem("Type") === "Usuário" ? false : true
}