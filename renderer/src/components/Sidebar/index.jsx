import React from "react";
import { IconEthernet, IconMaintenance, IconPower,  IconReturn, IconScreen, MenuItemSidebar, MenuSidebar, SidebarBody } from "./style";
import { Wake_On_Lan } from "../../services/server/WakeOnLan";
import { Restart } from "../../services/cliente/Shutdown";
import { ShutDownNow } from "../../services/cliente/Shutdown";
import swal from "sweetalert";
import { SubMenu } from "react-pro-sidebar";
import { CheckDisk, CheckHealth, RestoreHealth, ScanHealth, Scannow } from "../../utils/CmdCommand";



export const SideBar = ({collapsed, ipAddress, macAddress, viewInformation}) => { 
   
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
            if(value) { 
                const response = await ShutDownNow(ipAddress)

                if (response.ok == true) {
                    swal({
                        title: "Feito!",
                        text: response.msg,
                        icon: "success",
                        timer: 2000
                    })
                }else if(response == null || response == undefined){

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
        if(response.ok === true){ 
            swal({ 
                title: "Feito!",
                text: response.msg,
                icon: "success",
                timer: 2000
            })
        }else if(response == null || response == undefined){

        }else { 
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
        if(response.ok == true){ 
            swal({ 
                title: "Feito!", 
                text: response.msg,
                icon: "success",
                timer: 2000
            })
        }else if(response == null || response == undefined){

        }else  { 
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
            <SidebarBody collapsed={collapsed} style={{position: "absolute", border: "none", height: "111vh"}}>
                <MenuSidebar>
                    <SubMenu icon={<IconReturn/>} onClick={closeNewWindow}>
                    </SubMenu>
                    <SubMenu icon={<IconPower></IconPower>}>
                        <MenuItemSidebar onClick={()=> handlePowerOff()}>Desligar</MenuItemSidebar>
                        <MenuItemSidebar onClick={()=> handleRestart()}>Reiniciar</MenuItemSidebar>
                    </SubMenu>
                    <SubMenu icon={<IconEthernet></IconEthernet>}>
                        <MenuItemSidebar onClick={()=> handleWakeOnLan()}>Wake on Lan</MenuItemSidebar>
                    </SubMenu>
                    <SubMenu icon={<IconScreen/>}>
                        <MenuItemSidebar >Receber imagem</MenuItemSidebar>
                    </SubMenu>
                    <SubMenu icon={<IconMaintenance/>}>
                        <MenuItemSidebar onClick={()=> Scannow(ipAddress, { type: "sfc"})}>System Files Check</MenuItemSidebar>
                        <MenuItemSidebar onClick={()=> CheckHealth(ipAddress, { type: "checkhealth"})} >DISM /checkhealth</MenuItemSidebar>
                        <MenuItemSidebar onClick={()=> ScanHealth(ipAddress, { type: "scanhealth"})} >DISM /scanhealth</MenuItemSidebar>
                        <MenuItemSidebar onClick={()=> RestoreHealth(ipAddress, { type: "restorehealth"})} >DISM /restorehealth</MenuItemSidebar>
                        <MenuItemSidebar onClick={()=> CheckDisk(ipAddress, { type: "chkdsk"})} >Check Disk</MenuItemSidebar>
                    </SubMenu>
                </MenuSidebar>
            </SidebarBody>
        </>
    )

}