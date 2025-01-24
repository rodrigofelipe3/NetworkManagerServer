import swal from "sweetalert"

export const DeleteComputer = async (IP) => { 
    return new Promise((resolve, reject) => {
        window.api.GetAddressIP()?.then(async (serverIP) => {
          let token = sessionStorage.getItem('Access-Token');
          const URL = `http://${serverIP}:5000/api/deletecomputer/${IP}`;
          const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
          };
    
          const response = await fetch(URL, options)
            .then((response) => response.json())
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              console.error(err);
              reject(err);
              return swal({
                title: "Error",
                text: `Impossivel buscar os dados,
                o servidor local não está ativo.`,
                icon: "error",
                timer: 3000,
                buttons: false,
              });
            });
        });
      });
}