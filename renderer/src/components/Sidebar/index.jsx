import React, {useState, useEffect} from "react";
import { IconEthernet, IconMaintenance, IconPower, IconReturn, MenuItemSidebar, MenuSidebar, ModalPassInput, ModalUserInput, SidebarBody } from "./style";
import { Wake_On_Lan } from "../../services/server/WakeOnLan";
import { Restart } from "../../services/cliente/Shutdown";
import { ShutDownNow } from "../../services/cliente/Shutdown";
import swal from "sweetalert";
import { SubMenu } from "react-pro-sidebar";
import { Modal } from "../Modal";



export const SideBar = ({ collapsed, ipAddress, macAddress, viewInformation }) => {

    const [isModalView, setIsModalView] = useState(false)
    const [isModalViewDelete, setIsModalViewDelete] = useState(false)
    const [input, setInput] = useState({hostname: '' ,userinput: '', userpassword: '', target: ''})
    const closeNewWindow = () => {
        window.api.ClosePrompt();
        viewInformation(false)
    }

    const openNewWindow = (port, type, command) => {
        window.api.OpenPrompt(`${ipAddress}:${port}/${type}`); 
    };
    const handlePowerOff = () => {
        swal({
            title: "Atenção!",
            text: "Tem certeza que deseja Desligar o computador?",
            icon: "warning",
            dangerMode: false,
            buttons: true
        }).then(async (value) => {
            if (value) {
                const response = await ShutDownNow(ipAddress)

                if (response.ok == true) {
                    swal({
                        title: "Feito!",
                        text: response.msg,
                        icon: "success",
                        timer: 2000
                    })
                } else if (response == null || response == undefined) {
                    swal({
                        title: "Error!",
                        text: 'Erro ao desligar o computador',
                        icon: "error",
                        timer: 2000
                    })
                } else {
                    swal({
                        title: "Feito!",
                        text: 'Computador Desligado!',
                        icon: "success",
                        timer: 2000
                    })
                }
            }
        })
    }
    const WakeOnLan = {
        mac: macAddress,
        ip: ipAddress
    }

    const handleOnChange = (event) => { 
        const {name, value} = event.target
        setInput((prevdata)=> ({ 
            ...prevdata,
            [name]:value
        }))
    }

   
    const handleWakeOnLan = async () => {
        const response = await Wake_On_Lan(WakeOnLan)
        if (response.ok === true) {
            swal({
                title: "Feito!",
                text: response.msg,
                icon: "success",
                timer: 2000
            })
        } else if (response == null || response == undefined) {

        } else {
            swal({
                title: "Error!",
                text: response.error,
                icon: "error",
                timer: 2000
            })
        }
    }
    

    const handleRestart = () => {
        const response = Restart(ipAddress)
        
        if (response == null || response == undefined) {
            swal({
                title: "Error!",
                text: 'Erro ao enviar comando de Reiniciar',
                icon: "error",
                timer: 2000
            })
        } else {
            swal({
                title: "Feito!",
                text: 'Computador Desligado',
                icon: "success",
                timer: 2000
            })
        }
    }

    const handleClickDelete = () => { 
        openNewWindow(444, 'CMDKEY', `cmdkey /delete: ${input.target}`)
        setIsModalViewDelete(false)
    }

    return (
        <>
            
            {isModalViewDelete && ( 
                <Modal view={setIsModalViewDelete} title={'Deletar credenciais de usuário'} onClick={handleClickDelete} children={
                <>
                    <div style={{height: '200px'}}>
                        <label htmlFor="target" style={{width: "100%", fontSize: '12px'}}>Utilize o CMDKEY "/list" para listar as conexões existentes</label>
                        <ModalUserInput  type="text" placeholder="TERMSRV/Servidor" name="target" onChange={handleOnChange} />
                    </div>
                </>}/>
            )}
            <SidebarBody collapsed={collapsed} style={{ position: "absolute", border: "none"}}>
                <MenuSidebar>
                    <SubMenu icon={<IconReturn />} onClick={closeNewWindow}>
                    </SubMenu>
                    <SubMenu icon={<IconPower></IconPower>}>
                        <MenuItemSidebar onClick={() => handlePowerOff()}>Desligar</MenuItemSidebar>
                        <MenuItemSidebar onClick={() => handleRestart()}>Reiniciar</MenuItemSidebar>
                    </SubMenu>
                    <SubMenu icon={<IconEthernet></IconEthernet>}>
                        <MenuItemSidebar onClick={() => handleWakeOnLan()}>Wake on Lan</MenuItemSidebar>
                    </SubMenu>
                    <SubMenu onClick={()=> openNewWindow(444, 'CLI')} icon={<IconMaintenance /> }>
                    </SubMenu>
                </MenuSidebar>
            </SidebarBody>
        </>
    )

}