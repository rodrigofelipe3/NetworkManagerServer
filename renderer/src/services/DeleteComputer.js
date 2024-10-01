import swal from "sweetalert"

export const DeleteComputer = async (IP) => { 
    const URL = `http://127.0.0.1:5000/api/deletecomputer/${IP}`
    const options = { 
        method: "DELETE",
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
            text: "O servidor local não esta iniciado!",
            icon: "error",
            timer: 3000,
            buttons: false
        })
        
    })

    return response
}