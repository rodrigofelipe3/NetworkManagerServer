import React from "react";
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

    const closeNewWindow = () => {
        window.api.ClosePrompt();
        viewInformation(false)
    }
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
            <Modal title={'Usuário e senha'} children={
                <>
                    <div style={{display: "flex", flexWrap: 'wrap'}}>
                        <label htmlFor="userinput" style={{width: "100%"}}>Usuário</label>
                        <ModalUserInput type="text" name="userinput" placeholder="Nome do Usuário" />
                        <label htmlFor="userpassword" style={{width: "100%"}}>Senha</label>
                        <ModalPassInput type="password" name="userpassword" placeholder="Digite a senha" />
                    </div>
                </>
            }></Modal>
            <SidebarBody collapsed={collapsed} style={{ position: "absolute", border: "none", height: "100%" }}>
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
                    <SubMenu icon={<IconScreen />}>
                        <MenuItemSidebar >Receber imagem</MenuItemSidebar>
                    </SubMenu>
                    <SubMenu icon={<IconMaintenance />}>
                        <MenuItemSidebar onClick={() => Scannow(ipAddress, { type: "sfc" })}>System Files Check</MenuItemSidebar>
                        <MenuItemSidebar onClick={() => CheckDisk(ipAddress, { type: "chkdsk" })} >Check Disk</MenuItemSidebar>
                        <SubMenuSidebar label={'CmdKey'} style={{ display: 'block', alignContent: 'center' }}>
                            <MenuItemSidebar onClick={CmdKey(ipAddress, { command: '/list' })}>/list</MenuItemSidebar>
                            <MenuItemSidebar onClick={CmdKey(ipAddress, { command: '/list' })}>/add</MenuItemSidebar>
                            <MenuItemSidebar onClick={CmdKey(ipAddress, { command: '/list' })}>/delete</MenuItemSidebar>
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