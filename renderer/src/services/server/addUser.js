import swal from "sweetalert"

export const addUser = async ( data) => { 
    const URL = `http://127.0.0.1:5000/api/adduser`
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