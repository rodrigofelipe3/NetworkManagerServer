import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "./style";
import swal from "sweetalert";
import { Taskkill } from "../../services/cliente/Taskkill";
import { CancelShutDown, CreateShutDown } from "../../services/cliente/Shutdown";
import { DeleteComputer } from "../../services/server/DeleteComputer";


export const FloatButton = ({
    children,
    pid,
    ip,
    taskkill
}) => {
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('18:30');

    const handleTaskkill = async (ip, pid) => {
        const response = await Taskkill(ip, pid)
        if (response.msg) {
            swal({
                title: "Feito",
                text: " " + response.msg,
                icon: "success",
                timer: 2000
            })
        } else {
            swal({
                title: "Oops",
                text: "Erro: " + response.error,
                icon: "error",
                timer: 2000
            })
        }
    }

    useEffect(() => {
        const handleClickOutside = () => setVisible(false);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.pageX, y: e.pageY });
        setVisible(true);
    };

    const handleCancelShutdown = () => {
        swal({
            title: "Atenção!",
            text: "Tem certeza que deseja cancelar a programação de Shutdown?",
            icon: "warning",
            dangerMode: false,
            buttons: true
        }).then(async (value) => {
            if (value) {
                const response = await CancelShutDown(ip)

                if (response.ok == true) {
                    swal({
                        title: "Feito!",
                        text: response.msg,
                        icon: "success",
                        timer: 2000
                    })
                } else {
                    swal({
                        title: "Error!",
                        text: response.error,
                        icon: "error",
                        timer: 2000
                    })
                }
            }

        })
    }
    const handleOnChange = (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, '');

        if (inputValue.length > 2) {
            inputValue = inputValue.replace(/(\d{2})(\d{0,2})/, '$1:$2');
        }

        if (inputValue.length > 5) {
            inputValue = inputValue.slice(0, 5);
        }
        setValue(inputValue);
    }
    const handleCreateShutDown = async () => {
        swal({
            title: "Atenção!",
            text: "Digite o horário para desligar",
            icon: "warning",
            content: {
                element: "input",
                attributes: {
                    placeholder: "18:30",
                    type: "text",
                    value: value,
                    onchange: handleOnChange
                }
            },
            buttons: [true, true]

        }).then(async (value) => {
            if (value) {
                const response = await CreateShutDown(ip, value)

                if (response.ok == true) {
                    swal({
                        title: "Feito!",
                        text: response.msg,
                        icon: "success",
                        timer: 2000
                    })
                } else {
                    swal({
                        title: "Error!",
                        text: response.error,
                        icon: "error",
                        timer: 2000
                    })
                }
            }
        })
    }
    const handleDeleteComputer = async () => {
        swal({
            title: "Atenção!",
            text: "Tem certeza que deseja deletar os dados desse computador?",
            icon: "warning",
            dangerMode: false,
            buttons: true
        }).then(async (value) => {
            if (value === true) {
                const response = await DeleteComputer(ip)

                if (response.ok === true) {
                    swal({
                        title: "Feito!",
                        text: response.msg,
                        icon: "success",
                        timer: 2000
                    })
                } else {
                    swal({
                        title: "Error!",
                        text: response.error,
                        icon: "error",
                        timer: 2000
                    })
                }
            }
        })
    }


    return (
        <>
            <div onContextMenu={handleContextMenu} style={{ width: "100%", display: "flex" }}>

                {taskkill &&
                    <Menu top={menuPosition.y} left={menuPosition.x} visible={visible}>
                        <MenuItem onClick={() => handleTaskkill(ip, pid)} >Finalizar tarefa</MenuItem>
                    </Menu>
                }
                {!taskkill &&
                    <Menu top={menuPosition.y} left={menuPosition.x} visible={visible}>
                        <MenuItem onClick={() => handleDeleteComputer()} >Deletar este Computador</MenuItem>
                        <MenuItem onClick={() => handleCancelShutdown()} >Cancelar Shutdown</MenuItem>
                        <MenuItem onClick={() => handleCreateShutDown()} >Programar Shutdown</MenuItem>
                    </Menu>
                }
                {children}
            </div>
        </>
    )
}