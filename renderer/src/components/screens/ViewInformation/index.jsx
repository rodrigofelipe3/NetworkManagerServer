import React, { createContext, useEffect, useState } from "react";
import { InformationContent } from "./style";
import { Table } from "../../Table";
import { SideBar } from "../../Sidebar";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SwitchLabels } from "../../Switch";
import { WebSocketProvider } from "../../../utils/WebSocketProvider";


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
    handleGetProcessMemory,
    handleGetProcess,
    ipAdress,
    macAdress,
    recharge,
    viewInformation,
}) => {

    const [isChecked, setIsChecked] = useState(null)
    const [logs, setLogs] = useState('')

    /*const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://${ipAdress}:443`, {
        onOpen: () => console.log('Conectado ao servidor cliente via WebSocket.'),
        onClose: () => {
            console.log('Conexão encerrada.');
            sendMessage('close');
        },
        onError: (error) => {
            console.log('Erro:', error);
            sendMessage('error');
        },
        shouldReconnect: () => true,
    })


    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];*/



    return (
        <>
            <SideBar collapsed={true} macAddress={macAdress} ipAddress={ipAdress} viewInformation={viewInformation} />
            <WebSocketProvider ipAddress={ipAdress}>
                <InformationContent>
                <div id="manager-buttons">
                </div>
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
                        <div id="SwitchButton">
                            
                        {/*<SwitchLabels
                            ipAdress={ipAdress}
                            Checked={setIsChecked}
                        />*/}
                            
                        </div>
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
            </WebSocketProvider>
        </>
    )
}