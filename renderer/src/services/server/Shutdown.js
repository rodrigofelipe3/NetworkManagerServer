import swal from "sweetalert";

export const RemoveShutdownDB = async (
  data = { poweroff: "", poweroffhour: 'none', ip: "" }
) => {
    return new Promise((resolve, reject) => {
      window.api.GetAddressIP()?.then(async (serverIP) => {
        let token = sessionStorage.getItem('Access-Token');
        const URL = `http://${serverIP}:5000/api/updatepoweroff`;
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        };

        const response = await fetch(URL, options)
          .then((response) => response.json())
          .then((data) => {
            if (data.ok == true) {
              swal({
                title: "Done!",
                text: data.msg,
                icon: "success",
                timer: 2000,
                buttons: false,
              });
              resolve({ ok: true });
            } else {
              swal({
                title: "Error",
                text: data.error,
                icon: "error",
                timer: 2000,
                buttons: false,
              });
              resolve({ ok: false });
            }
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
};

export const UpdatePowerOffDB = async (
  data = { poweroff: "", poweroffhour: "", ip: "" }
) => {
  return new Promise(async (resolve, reject) => {
      window.api.GetAddressIP()?.then(async (serverIP) => {
        let token = sessionStorage.getItem('Access-Token');
        const URL = `http://${serverIP}:5000/api/updatepoweroff`;
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        };
        const response = await fetch(URL, options)
          .then((response) => response.json())
          .then((data) => {
            if (data.ok === true) {
              swal({
                title: "Done!",
                text: data.msg,
                icon: "success",
                timer: 2000,
                buttons: false,
              });
              resolve({ ok: true });
            } else {
              swal({
                title: "Error",
                text: data.error,
                icon: "error",
                timer: 2000,
                buttons: false,
              });
              resolve({ ok: false });
            }
          })
          .catch((err) => {
            console.error(err);
            swal({
              title: "Error",
              text: "O servidor local não esta iniciado!",
              icon: "error",
              timer: 3000,
              buttons: false,
            });
          });
        resolve({ ok: false });
      });
  });
};
