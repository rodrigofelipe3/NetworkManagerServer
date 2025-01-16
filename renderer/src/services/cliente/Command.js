import swal from "sweetalert"

export const CmdKey = async (IP, data) => { 
    const type = data.type
    console.log(data.type)
    const URL = `http://${IP}:5001/api/cmdcommand`
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
        if(type == 'information'){ 
           return {ok: false}
        }else { 
            return swal({
                title: "Error",
                text: "Não foi possivel contactar o computador selecionado." ,
                icon: "error",
                timer: 3000,
                buttons: false
            })
        }
    })

    return response
}