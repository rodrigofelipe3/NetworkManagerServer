import swal from "sweetalert"

export const TradePeriphals = async (formData) => { 
    return new Promise((resolve, reject) => {
        window.api.GetAddressIP()?.then(async (serverIP) => {
          let token = sessionStorage.getItem('Access-Token');
          const URL = `http://${serverIP}:5000/api/addtradeperiphals`;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
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