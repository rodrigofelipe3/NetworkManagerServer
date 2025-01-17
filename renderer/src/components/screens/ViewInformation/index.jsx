import React, { useEffect, useState } from "react";
import { InformationContent } from "./style";
import { Table } from "../../Table";
import { SideBar } from "../../Sidebar";
import { WebSocketProvider } from "../../../utils/WebSocketProvider";
import AlertComponent from "../../Alert";


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
        status: "",
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
    ipAdress,
    macAdress,
    viewInformation,
}) => {
    const [connectionError, setConnectionError] = useState(false)
    const [Recharge, setRecharge] = useState(null)

    useEffect(()=> { 
        if(data) { 
            setRecharge(true)
        }
    }, [])

    return (
        <>
            
            <SideBar collapsed={true} macAddress={macAdress} ipAddress={ipAdress} viewInformation={viewInformation} />
            <WebSocketProvider ipAddress={ipAdress} connectionError={setConnectionError}>
                <InformationContent>
                    {connectionError && <AlertComponent msg={'Erro ao estabelecer métricas com o Computador Cliente'} opened={connectionError} setConnectionErr={setConnectionError}/> }
                    <div id={"grid-display"}>
                        <div id="systemInformation">
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
                                Recharge={Recharge}
                                isTaskManager={true}
                                headers={["Nome", "Memory", "PID"]}
                                data={information}
                                ipAdress={ipAdress}
                            />
                        </div>
                    </div>

                </InformationContent>
            </WebSocketProvider>
        </>
    )
}