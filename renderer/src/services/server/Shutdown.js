import swal from "sweetalert";
import { CancelShutDown, CreateShutDown } from "../cliente/Shutdown";

export const RemoveShutdownDB = async (data = { poweroff: "", ip: "" }) => {

  return new Promise(async (resolve, reject) => {
    const URL = `http://127.0.0.1:5000/api/updatepoweroff`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(URL, options)
      .then((response) => response.json())
      .then(async (data) => {
        if (data.ok == true) {
          swal({
            title: "Done!",
            text: data.msg,
            icon: "success",
            timer: 2000,
            buttons: false,
          });
          const response1 = await CancelShutDown(data.ip);
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
        resolve({ ok: false });
      });

  });
};

export const UpdatePowerOffDB = async (
  data = { poweroff: "", poweroffhour: "", ip: "" }
) => {
  console.log(data)
  const response1 = await CreateShutDown(data.ip, data.poweroffhour);

  return new Promise(async (resolve, reject) => {
    if (response1.ok == true) {
      const URL = `http://127.0.0.1:5000/api/updatepoweroff`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
          swal({
            title: "Error",
            text: "O servidor local não esta iniciado!",
            icon: "error",
            timer: 3000,
            buttons: false,
          });
        });
      resolve({ ok: false });
    } else {
      swal({
        title: "Error",
        text: response1.error,
        icon: "error",
        timer: 3000,
        buttons: false,
      });
      resolve({ ok: false });
    }
  });
};
