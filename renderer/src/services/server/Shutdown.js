import swal from "sweetalert";
import { CancelShutDown, CreateShutDown } from "../cliente/Shutdown";

export const RemoveShutdownDB = async (data = { poweroff: "", ip: "" }) => {
  const response1 = await CancelShutDown(data.ip);
  
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
          return swal({
            title: "Done!",
            text: data.msg,
            icon: "success",
            timer: 2000,
            buttons: false,
          });
        } else {
          return swal({
            title: "Error",
            text: data.error,
            icon: "error",
            timer: 2000,
            buttons: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return swal({
          title: "Error",
          text: "O servidor local não esta iniciado!",
          icon: "error",
          timer: 3000,
          buttons: false,
        });
      });

    return response;
  }  else {
    return swal({
      title: "Error",
      text: response1.error,
      icon: "error",
      timer: 3000,
      buttons: false,
    });
  }
};

export const UpdatePowerOffDB = async (data = { poweroff: "", ip: "", time: ""}) => { 
    const response1 = await CreateShutDown(data.ip, data.time);
    console.log(data)
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
          return swal({
            title: "Done!",
            text: data.msg,
            icon: "success",
            timer: 2000,
            buttons: false,
          });
        } else {
          return swal({
            title: "Error",
            text: data.error,
            icon: "error",
            timer: 2000,
            buttons: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return swal({
          title: "Error",
          text: "O servidor local não esta iniciado!",
          icon: "error",
          timer: 3000,
          buttons: false,
        });
      });

    return response;
  }  else {
    return swal({
      title: "Error",
      text: response1.error,
      icon: "error",
      timer: 3000,
      buttons: false,
    });
  }
}
