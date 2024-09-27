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
        return console.error(err)
    })

    return response
}