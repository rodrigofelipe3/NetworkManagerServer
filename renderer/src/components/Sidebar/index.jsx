import React, {useState, useEffect} from "react";
import { IconEthernet, IconMaintenance, IconPower, IconReturn, IconScreen, MenuItemSidebar, MenuSidebar, ModalPassInput, ModalUserInput, SidebarBody, SubMenuSidebar } from "./style";
import { Wake_On_Lan } from "../../services/server/WakeOnLan";
import { Restart } from "../../services/cliente/Shutdown";
import { ShutDownNow } from "../../services/cliente/Shutdown";
import swal from "sweetalert";
import { SubMenu } from "react-pro-sidebar";
import { CheckDisk, CheckHealth, RestoreHealth, ScanHealth, Scannow } from "../../utils/CmdCommand";
import { CmdKey } from "../../services/cliente/Command";
import { Modal } from "../Modal";



export const SideBar = ({ collapsed, ipAddress, macAddress, viewInformation }) => {

    const [isModalView, setIsModalView] = useState(false)
    const [isModalViewDelete, setIsModalViewDelete] = useState(false)
    const [input, setInput] = useState({hostname: '' ,userinput: '', userpassword: '', target: ''})

    const [SideBarSize, setSidebarSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      // Função para atualizar o tamanho do modal
      const updateSideBarSize = () => {
        setSidebarSize({
          width: document.body.clientWidth,
          height: document.body.clientHeight,
        });
      };
    
      useEffect(() => {
        // Atualiza o tamanho inicial do modal
        updateSideBarSize();
        window.addEventListener("resize", updateSideBarSize);
        return () => window.removeEventListener("resize", updateSideBarSize);
      }, []);

    const closeNewWindow = () => {
        window.api.ClosePrompt();
        viewInformation(false)
    }

    const openNewWindow = () => {
        window.api.OpenPrompt(ipAddress); 
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
    const handleSetModalDelete = () => { 
        setIsModalView(false)
        setIsModalViewDelete(true)
        
    }
    const handleOnClickAdd = () => { 
        CmdKey(ipAddress, {type: 'cmdkey', command: `/add:${input.hostname} /user:${input.userinput} /pass:${input.userpassword}` })
        setIsModalView(false)
        openNewWindow()
    }

    const handleOnClickDelete = () => { 
        CmdKey(ipAddress, {type: 'cmdkey', command: `cmdkey /delete:${input.target}`})
    }

    const handleListCmdKey = () => { 
        CmdKey(ipAddress, {type: 'cmdkey', command: '/list'})
        openNewWindow()
    }
    const handleRestart = () => {
        const response = Restart(ipAddress)
        if (response.ok == true) {
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

    return (
        <>
            {isModalView && 
            (<Modal view={setIsModalView} title={'Credenciais de Segurança'} onClick={handleOnClickAdd} children={
                <>
                    <div style={{display: "flex", flexWrap: 'wrap', height: '300px', marginBottom: '75px'}}>
                        <label htmlFor="hostname" style={{width: "100%", fontSize: '12px'}}>Nome da máquina sem "\\"</label>
                        <ModalUserInput type="text" name="hostname" placeholder="SERVIDOR" onChange={handleOnChange}/>
                        <label htmlFor="userinput" style={{width: "100%", fontSize: '12px'}}>Usuário</label>
                        <ModalUserInput type="text" name="userinput" placeholder="Nome do Usuário" onChange={handleOnChange}/>
                        <label htmlFor="userpassword" style={{width: "100%", fontSize: '12px'}}>Senha</label>
                        <ModalPassInput type="password" name="userpassword" placeholder="Digite a senha" onChange={handleOnChange}/>
                    </div>
                </>
            }></Modal>)}
            {isModalViewDelete && ( 
                <Modal view={setIsModalViewDelete} title={'Deletar credenciais de usuário'} onClick={handleOnClickDelete} children={
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
                    {/*<SubMenu icon={<IconScreen />}>
                        <MenuItemSidebar >Receber imagem</MenuItemSidebar>
                    </SubMenu>*/}
                    <SubMenu icon={<IconMaintenance />}>
                        <MenuItemSidebar onClick={() => Scannow(ipAddress, { type: "sfc" })}>System Files Check</MenuItemSidebar>
                        <MenuItemSidebar onClick={() => CheckDisk(ipAddress, { type: "chkdsk" })} >CheckDisk</MenuItemSidebar>
                        <SubMenuSidebar label={'CmdKey'} style={{ display: 'block', alignContent: 'center' }}>
                            <MenuItemSidebar onClick={()=> handleListCmdKey()}>/list</MenuItemSidebar>
                            <MenuItemSidebar onClick={()=> setIsModalView(true)}>/add</MenuItemSidebar>
                            <MenuItemSidebar onClick={handleSetModalDelete}>/delete</MenuItemSidebar>
                        </SubMenuSidebar>
                        <SubMenuSidebar label={'DISM'} style={{ width: '100%', display: 'block', alignContent: 'center' }}>
                            <MenuItemSidebar onClick={() => CheckHealth(ipAddress, { type: "checkhealth" })} >/checkhealth</MenuItemSidebar>
                            <MenuItemSidebar onClick={() => ScanHealth(ipAddress, { type: "scanhealth" })} >/scanhealth</MenuItemSidebar>
                            <MenuItemSidebar onClick={() => RestoreHealth(ipAddress, { type: "restorehealth" })} >/restorehealth</MenuItemSidebar>
                        </SubMenuSidebar>
                        <MenuItemSidebar onClick={() => CheckDisk(ipAddress, { type: "chkdsk" })} >OpenCMD</MenuItemSidebar>
                    </SubMenu>
                </MenuSidebar>
            </SidebarBody>
        </>
    )

}