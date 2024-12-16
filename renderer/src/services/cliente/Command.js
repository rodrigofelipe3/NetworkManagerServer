import swal from "sweetalert"

export const CmdKey = async (IP, data) => { 
    const URL = `http://${IP}:5001/api/commands`
    const options = { 
        method: "POST",
        headers: { 
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
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