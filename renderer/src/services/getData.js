export const GetData = async () => { 
    const URL = "http://localhost:5000/api/computers"
    const options = { 
        method: "GET",
        headers: { 
            "Content-Type": "application/json"
        }
    }
    
    const response = await fetch(URL, options)
    .then((response)=> response.json())
    .then((data)=> { 
        return data
    })
    .catch((err)=> { 
        return console.error(err)
    })

    return response
}