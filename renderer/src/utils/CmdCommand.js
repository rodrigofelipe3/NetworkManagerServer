import swal from "sweetalert"



export const Scannow = async (IP, data) => {
    console.log(IP)
    const URL = `http://${IP}:5001/api/cmdcommand/`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    await fetch(URL, options)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok == true) {
                const openNewWindow = () => {
                    window.api.OpenPrompt(IP); // Chamando ipcRenderer via contextBridge
                };

                openNewWindow()
            } else {
                return swal({
                    title: "Error",
                    text: data.error,
                    icon: "error",
                    buttons: true
                })
            }
        })
        .catch((err) => {
            return swal({
                title: "Error",
                text: "Não foi possivel contactar o computador selecionado. " + err,
                icon: "error",
                buttons: true
            })
        })
}

export const CheckHealth = async (IP, data) => {
    const URL = `http://${IP}:5001/api/cmdcommand/`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(URL, options)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok == true) {
                const openNewWindow = () => {
                    window.api.OpenPrompt(IP); // Chamando ipcRenderer via contextBridge
                };

                openNewWindow()
            } else {
                return swal({
                    title: "Error",
                    text: response.error,
                    icon: "error",
                    buttons: true
                })
            }
        })
        .catch((err) => {
            return swal({
                title: "Error",
                text: "Não foi possivel contactar o computador selecionado. " + err,
                icon: "error",
                buttons: true
            })
        })
}

export const ScanHealth = async (IP, data) => {
    const URL = `http://${IP}:5001/api/cmdcommand/`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(URL, options)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok == true) {
                const openNewWindow = () => {
                    window.api.OpenPrompt(IP); // Chamando ipcRenderer via contextBridge
                };

                openNewWindow()
            } else {
                return swal({
                    title: "Error",
                    text: response.error,
                    icon: "error",
                    buttons: true
                })
            }
        })
        .catch((err) => {
            return swal({
                title: "Error",
                text: "Não foi possivel contactar o computador selecionado. " + err,
                icon: "error",
                buttons: true
            })
        })
}


export const RestoreHealth = async (IP, data) => {
    const URL = `http://${IP}:5001/api/cmdcommand/`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(URL, options)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok == true) {
                const openNewWindow = () => {
                    window.api.OpenPrompt(IP); // Chamando ipcRenderer via contextBridge
                };
            
                openNewWindow()
            } else {
                return swal({
                    title: "Error",
                    text: response.error,
                    icon: "error",
                    buttons: true
                })
            }
        })
        .catch((err) => {
            return swal({
                title: "Error",
                text: "Não foi possivel contactar o computador selecionado. " + err,
                icon: "error",
                buttons: true
            })
        })
}

export const CheckDisk = async (IP, data) => {
    const URL = `http://${IP}:5001/api/cmdcommand/`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(URL, options)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok == true) {
                const openNewWindow = () => {
                    window.api.OpenPrompt(IP); // Chamando ipcRenderer via contextBridge
                };
            
                openNewWindow()
            } else {
                return swal({
                    title: "Error",
                    text: response.error,
                    icon: "error",
                    buttons: true
                })
            }
        })
        .catch((err) => {
            return swal({
                title: "Error",
                text: "Não foi possivel contactar o computador selecionado. " + err,
                icon: "error",
                buttons: true
            })
        })

    return response
}