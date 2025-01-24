import swal from "sweetalert";

export const GetData = async () => {
  return new Promise((resolve, reject) => {
    window.api.GetAddressIP()?.then(async (serverIP) => {
      let token = sessionStorage.getItem('Access-Token');
      do {
        token = sessionStorage.getItem('Access-Token');
      } while (token === null);
      if (token != null) {
        const URL = `http://${serverIP}:5000/api/computers`;
        const options = {
          method: "GET",
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
            swal({
              title: "Error",
              text: `Impossivel buscar os dados,
            o servidor local não está ativo.`,
              icon: "error",
              timer: 3000,
              buttons: false,
            });
          });
      }

    });
  });
};
