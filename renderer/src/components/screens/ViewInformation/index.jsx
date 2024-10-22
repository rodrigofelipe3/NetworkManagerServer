import React from "react";
import { InformationContent } from "./style";
import { Table } from "../../Table";
import { SideBar } from "../../Sidebar";

export const InformationScreen = ({
    data = [{
        
        id: "",
        host: "",
        processor: "",
        memory: "",
        hard_disk: "",
        operating_system: "",
        arch: "",
        release: "",
        monitors: "",
        ip: "", 
        mac_address: "", 
        status: "" ,
        network_devices: [""],
        poweroff: '',
        poweroffhour: ""

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
    handleGetProcessMemory,
    handleGetProcess,
    ipAdress,
    macAdress,
    recharge,
    viewInformation
}) => {
    

    return (
        <>
            <SideBar collapsed={true}  macAddress={macAdress} ipAddress={ipAdress} viewInformation={viewInformation}/>
            <InformationContent>
                <div id="manager-buttons">

                </div>
                <div id={"grid-display"}>
                    <div id="systemInformation">
                        <h1>Informações do Sistema</h1>
                        {data.id !== "" ?
                            data.map((information) =>
                            (<Table
                                isTaskManager={false}
                                headers={["Informações do Sistema"]}
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