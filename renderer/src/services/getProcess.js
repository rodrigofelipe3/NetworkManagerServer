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
        console.log(data) 
        return data
    })
    .catch((err)=> { 
        return console.error(err)
    })

    return response
}