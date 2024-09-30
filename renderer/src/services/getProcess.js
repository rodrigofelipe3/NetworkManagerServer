import swal from "sweetalert"

export const getProcess = async (IP) => { 
    const URL = `http://${IP}:5001/api/sendprocess`
    const options = { 
        method: "GET",
        headers: { 
            "Content-Type":"application/json"
        }
    }
    
    const response = await fetch(URL, options)
    .then((response)=> response.json())
    .then((data)=> {
        return data
    })
    .catch((err)=> { 
        console.error(err)
        return swal({
            title: "Error",
            text: "Não foi possivel contactar o computador selecionado." ,
            icon: "error",
            timer: 3000,
            buttons: false
        })
    })

    return response
}