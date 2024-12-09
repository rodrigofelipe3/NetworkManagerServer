import swal from "sweetalert"

export const CancelShutDown = async (IP) => {
    const URL = `http://${IP}:5001/api/cancel/shutdown`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(URL, options)
        .then((response) => response.json())
        .then((data) => {

            return data
        })
        .catch((err) => {
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

export const CreateShutDown = async (IP, time) => {
    const URL = `http://${IP}:5001/api/createshutdown/${time}`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(URL, options)
        .then((response) => response.json())
        .then((data) => {

            return data
        })
        .catch((err) => {
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


export const ShutDownNow = async (IP) => {
    const URL = `http://${IP}:5001/api/shutdown/now`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(URL, options)
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            return swal({
                title: "Error",
                text: "Não foi possivel contactar o computador selecionado." + err,
                icon: "error",
                timer: 3000,
                buttons: false
            })
        })

    return response
}

export const Restart = async (ip) => {
    const URL = `http://${ip}:5001/api/restart/now`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(URL, options)
        .then((response) => response.json())
        .then((data) => {

            return data
        })
        .catch((err) => {
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
