import swal from "sweetalert"

export const MakeReport = async () => { 
    return new Promise((resolve, reject) => {
        window.api.GetAddressIP()?.then(async (serverIP) => {
          let token = sessionStorage.getItem(1);
          do {
            token = sessionStorage.getItem(1);
          } while (token === null);
          const URL = `http://${serverIP}:5000/api/report`;
          const options = {
            method: "POST",
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