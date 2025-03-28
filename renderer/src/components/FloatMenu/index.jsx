import React, { useState, useEffect } from "react";
import { InputDiv, Menu, MenuItem, ModalDiv } from "./style";
import swal from "sweetalert";
import { Taskkill } from "../../services/cliente/Taskkill";
import { DeleteComputer } from "../../services/server/DeleteComputer";
import { addUser } from "../../services/server/addUser";
import { RemoveShutdownDB, UpdatePowerOffDB } from "../../services/server/Shutdown";
import { MakeReport } from "../../services/server/Report";
import { CancelShutDown } from "../../services/cliente/Shutdown";
import { Modal } from "../Modal";
import { ModalUserInput } from "../Sidebar/style";
import { TradePeriphals } from "../../services/server/TradePeriphals";

export const FloatButton = ({
    children,
    pid,
    ip,
    taskkill,
    settings,
    recharge,
}) => {
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const [isModalView, setIsModalView] = useState(false)
    const [price, setPrice] = useState()
    const [dataInput, setDataInput] = useState({
        data: '',
        product: '',
        department: '',
        delivered_by: '',
        receiver_name: '',
        reason: '',
        price: price
    })


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
                text: response.error? response.error : 'Erro desconhecido!',
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
    const closeMainWindow = () => {
        window.api.CloseMainWindow()
    }
    const handleContextMenu = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.pageX, y: e.pageY });
        setVisible(true);
    };
    var inputValue = '';
    const handleChangeUser = (e) => {
        inputValue = e.target.value;
    }

    const handleConnectUser = (type) => {
        swal({
            title: "Atenção!",
            text: type === 'user'? "Digite o nome do usuário deste computador" : "Digite o nome do departamento deste computador",
            icon: "warning",
            content: {
                element: "input",
                attributes: {
                    placeholder: type === 'user'? "Nome do Usuário": "Nome do Departamento",
                    type: "text",
                    value: inputValue,
                    onchange: handleChangeUser
                }
            },
            buttons: [true, true]

        }).then(async (data) => {
            if (data) {
                const formData = {
                    user: inputValue,
                    ip: ip,
                    type: type,
                }

                const response = await addUser(formData)
                if (response.ok == true) {
                    recharge(response.ok)
                    swal({
                        title: "Feito!",
                        text: response.msg,
                        icon: "success",
                        timer: 2000
                    })
                    recharge(true)
                } else {
                    swal({
                        title: "Error!",
                        text: response.error? response.error : 'Erro desconhecido!',
                        icon: "error",
                        timer: 2000
                    })
                }
            }
        })
    }

    const handleCancelShutdown = () => {
        swal({
            title: "Atenção!",
            text: "Tem certeza que deseja cancelar a programação de Shutdown?",
            icon: "warning",
            dangerMode: false,
            buttons: true
        }).then(async (value) => {
            if (value) {
                const formData = {
                    poweroff: 0,
                    poweroffhour: 'none',
                    ip: ip,
                }
                const response = await RemoveShutdownDB(formData)
                if (response.ok === true) {
                    await CancelShutDown(ip)
                    recharge(response.ok)
                } else if (response.ok === null || response.ok === undefined) {
                    return
                } else {
                    return
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

    const handleAddTradePeriphals = async () => {
        const response = await TradePeriphals(dataInput)
        if (response.ok == true) {
            swal({
                title: "Feito!",
                text: response.msg ? response.msg : 'Erro desconhecido',
                icon: "success",
                timer: 3000
            })
            setDataInput({
                data: '',
                product: '',
                department: '',
                delivered_by: '',
                receiver_name: '',
                reason: '',
                price: price
            })
            setPrice('')
        } else if (response.ok == false) {
            swal({
                title: "Error!",
                text: response.error? response.error : 'Erro desconhecido!',
                icon: "error",
                timer: 3000
            })
        }
    }
    const handleOnChangeModal = (e) => {
        const { name, value } = e.target
        setDataInput((prevData) => ({
            ...prevData,
            [name]: value
        }))
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
            console.log(value)
            if (value) {
                const formData = {
                    poweroff: 1,
                    poweroffhour: value,
                    ip: ip
                }
                const response = await UpdatePowerOffDB(formData)
                recharge(response.ok)
                
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

                    recharge(response.ok)
                } else {
                    swal({
                        title: "Error!",
                        text: response.error? response.error : 'Erro desconhecido!',
                        icon: "error",
                        timer: 2000
                    })
                }
            }
        })
    }

    const handleMakeReport = async (type) => {
        swal({
            title: "Atenção!",
            text: "Tem certeza que deseja gerar Relatório?",
            icon: "warning",
            dangerMode: false,
            buttons: true
        }).then(async (value) => {
            if (value === true) {
                const response = await MakeReport(type)

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
                        text: response.error? response.error : 'Erro desconhecido!',
                        icon: "error",
                        timer: 2000
                    })
                }
            }
        })
    }

    const formatCurrency = (input) => {
        // Remove tudo que não for número
        let numericValue = input.replace(/\D/g, "");

        // Converte para número e divide por 100 para obter formato decimal
        let formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        setPrice(formattedValue);
        setDataInput((prevData) => ({ ...prevData, price: formattedValue }))
        console.log(dataInput)
    };


    const handleChangeData = (e) => {
        let value = e.target.value;
        // Remove tudo que não for número
        value = value.replace(/\D/g, "");

        // Adiciona as barras automaticamente
        if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5);

        // Garante que o formato não ultrapasse DD/MM/AAAA
        if (value.length > 10) value = value.slice(0, 10);

        setDataInput((prevData) => ({ ...prevData, data: value }))
    };

    return (
        <>
            {isModalView &&
                (<Modal view={setIsModalView} title={'Troca de periférico'} onClick={handleAddTradePeriphals} children={
                    <>
                        <ModalDiv >
                            <InputDiv>
                                <label htmlFor="data">Data:</label>
                                <ModalUserInput type="text" name="data" placeholder="DD/MM/AAAA" onChange={handleChangeData} value={dataInput.data} />
                            </InputDiv>
                            <InputDiv>
                                <label htmlFor="product">Produto:</label>
                                <ModalUserInput type="text" name="product" placeholder="Teclado" onChange={handleOnChangeModal} value={dataInput.product} />
                            </InputDiv>
                            <InputDiv>
                                <label htmlFor="department">Setor: </label>
                                <ModalUserInput type="text" name="department" placeholder="Fiscal" onChange={handleOnChangeModal} value={dataInput.department} />
                            </InputDiv>
                            <InputDiv>
                                <label htmlFor="delivered_by">Liberado por: </label>
                                <ModalUserInput type="text" name="delivered_by" placeholder="Rodrigo" onChange={handleOnChangeModal} value={dataInput.delivered_by} />
                            </InputDiv>
                            <InputDiv>
                                <label htmlFor="receiver_name">Para: </label>
                                <ModalUserInput type="text" name="receiver_name" placeholder="Marcos" onChange={handleOnChangeModal} value={dataInput.receiver_name} />
                            </InputDiv>

                            <InputDiv>
                                <label htmlFor="reason">Motivo: </label>
                                <ModalUserInput type="text" name="reason" placeholder="Motivo para troca..." onChange={handleOnChangeModal} value={dataInput.reason} />
                            </InputDiv>
                            <InputDiv>
                                <label htmlFor="price">Preço: </label>
                                <ModalUserInput type="text" name="price" placeholder="R$ 00,00" onChange={(e) => formatCurrency(e.target.value)} value={price} />
                            </InputDiv>
                        </ModalDiv>
                    </>
                }></Modal>)}
            <div onContextMenu={handleContextMenu}>

                {taskkill && !settings &&
                    <Menu top={menuPosition.y} left={menuPosition.x} visible={visible}>
                        <MenuItem onClick={() => handleTaskkill(ip, pid)} >Finalizar tarefa</MenuItem>
                    </Menu>
                }
                {!taskkill && !settings &&
                    <Menu top={menuPosition.y} left={menuPosition.x} visible={visible}>
                        <MenuItem onClick={() => handleConnectUser('user')} >Definir Usuário</MenuItem>
                        <MenuItem onClick={() => handleConnectUser('department')} >Definir Departamento</MenuItem>
                        <MenuItem onClick={() => handleDeleteComputer()} >Deletar este Computador</MenuItem>
                        <MenuItem onClick={() => handleCancelShutdown()} >Cancelar Shutdown</MenuItem>
                        <MenuItem onClick={() => handleCreateShutDown()} >Programar Shutdown</MenuItem>
                    </Menu>
                }
                {!taskkill && settings &&
                    <Menu top={menuPosition.y} left={menuPosition.x} visible={visible}>
                        <MenuItem onClick={() => setIsModalView(true)} >Adicionar troca de Periférico</MenuItem>
                        <MenuItem onClick={() => handleMakeReport('pcs')} >Relatório de Máquinas</MenuItem>
                        <MenuItem onClick={() => handleMakeReport('periphals')} >Relatório Troca de Periféricos</MenuItem>
                        <MenuItem onClick={() => closeMainWindow()}>Fechar Aplicação</MenuItem>
                    </Menu>
                }
                {children}
            </div>
        </>
    )
}