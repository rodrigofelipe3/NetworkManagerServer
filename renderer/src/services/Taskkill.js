import swal from "sweetalert"

export const Taskkill = async (IP, pid) => { 
    const URL = `http://${IP}:5001/api/taskkill/${pid}`
    const options = { 
        method: "POST",
        headers: { 
            "Content-Type":"application/json"
        }
    }
    
    const response = await fetch(URL, options)
    .then((response)=> response.json())
    .then((data)=> {
        console.log("taskkill " +  data) 
        return data
    })
    .catch((err)=> { 
        return swal({
            title: "Error",
            text: "Não foi possivel contactar o computador selecionado.",
            icon: "error",
            timer: 3000,
            buttons: false
        })
    })
    
    return response
}