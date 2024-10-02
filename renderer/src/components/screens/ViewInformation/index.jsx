import React, { useState } from "react";
import { StyledButton } from "../../../pages/Homepage/style";
import { IconPower, InformationContent } from "./style";
import { Table } from "../../Table";
import { VerticalIcon } from "../ListCompScreen/style";
import { FloatButton } from "../../FloatMenu";
import { Wake_On_Lan } from "../../../services/server/WakeOnLan";
import { IconEthernet } from "./style";
import swal from "sweetalert";

export const InformationScreen = ({
    data = [{
        id: "",
        host: "",
        processor: "",
        memory: "",
        operating_system: "",
        arch: "",
        release: "",
        ip: "",
        mac_address: "",
        status: "",
        network_devices: "",

    },
    ],
    information = [{
        data: {
            system: {
                cpuUsage: "0.0",
                memoryUsage: "0.0"
            },
            processes: [{
                name: "",
                cpu: "",
                memory: "",
                pid: 1
            }]
        }
    }],
    informationScreen,
    handleGetProcessMemory,
    handleGetProcess,
    handleGetScreen,
    ipAdress,
    macAdress
}) => {

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
        }else { 
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
            <InformationContent>
                <div id="manager-buttons">
                    <StyledButton id="back-button" onClick={() => informationScreen()}>
                        Voltar
                    </StyledButton>
                    <StyledButton id="screen-button" onClick={() => handleGetScreen}>Screen</StyledButton>
                    <StyledButton id="wake-on-button" onClick={()=> handleWakeOnLan()}> <IconEthernet/> Acordar</StyledButton>
                    <StyledButton id="wake-on-button" onClick={()=> handleWakeOnLan()}> <IconPower/> Desligar</StyledButton>
                    <FloatButton ip={ipAdress} taskkill={false}>
                        <VerticalIcon />
                    </FloatButton>
                </div>
                <div id={"grid-display"}>
                    <div id="systemInformation">
                        <h1>System Information</h1>
                        {data.id !== "" ?
                            data.map((information) =>
                            (<Table
                                isTaskManager={false}
                                headers={["Information", "Type"]}
                                isSystemInfo={true}
                                information={information}
                            />)
                            ) : <h1>Nenhum dado encontrado!</h1>}
                    </div>
                    <div id="ManagerTask">
                        <Table
                            onClickMem={handleGetProcessMemory}
                            onClickCPU={handleGetProcess}
                            isTaskManager={true}
                            headers={["Nome", "CPU", "Memory", "PID"]}
                            data={information}
                            ipAdress={ipAdress}
                        />
                    </div>
                </div>

            </InformationContent>

        </>
    )
}