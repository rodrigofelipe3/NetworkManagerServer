import React from "react";
import { IconEthernet, IconMaintenance, IconPower, IconRestart, IconReturn, IconScreen, MenuItemSidebar, MenuSidebar, SidebarBody } from "./style";
import { Wake_On_Lan } from "../../services/server/WakeOnLan";
import { Restart } from "../../services/cliente/Shutdown";
import { ShutDownNow } from "../../services/cliente/Shutdown";
import swal from "sweetalert";
import { SubMenu } from "react-pro-sidebar";

export const SideBar = ({collapsed, ipAdress, macAdress, viewInformation}) => { 

    const handlePowerOff = () => { 
        swal({
            title: "Atenção!",
            text: "Tem certeza que deseja Desligar o computador?",
            icon: "warning",
            dangerMode: false,
            buttons: true
        }).then(async (value) => {
            if(value) { 
                const response = await ShutDownNow(ipAdress)

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
        mac: macAdress,
        ip: ipAdress
    }
    const handleWakeOnLan = () => { 
        const response = Wake_On_Lan(ipAdress, WakeOnLan)
        if(response.ok == true){ 
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
        const response = Restart(ipAdress)
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
            <SidebarBody collapsed={collapsed} style={{position: "absolute", border: "none", height: "100vh"}}>
                <MenuSidebar>
                    <SubMenu icon={<IconReturn/>}>
                        <MenuItemSidebar onClick={()=> viewInformation(false)}>Voltar</MenuItemSidebar>
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
                        <MenuItemSidebar >System Files Check</MenuItemSidebar>
                        <MenuItemSidebar >DISM /checkhealth</MenuItemSidebar>
                        <MenuItemSidebar >DISM /scanhealth</MenuItemSidebar>
                        <MenuItemSidebar >DISM /restorehealth</MenuItemSidebar>
                        <MenuItemSidebar >Check Disk</MenuItemSidebar>
                    </SubMenu>
                </MenuSidebar>
            </SidebarBody>
        </>
    )

}