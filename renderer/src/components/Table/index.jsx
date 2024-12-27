import React, { useEffect, useState } from "react";
import { HeaderCell, TableBody, TableCell, TableContent, TableHeader, TableRow, TopContent } from "./style";
import { FloatButton } from "../FloatMenu";
import { Header } from "../Header/style";
import Chart from "../Chart";
import useWebSocket, {ReadyState} from "react-use-websocket";
import { CmdKey } from "../../services/cliente/Command";

const teste = [
    'Realtek PCIe GbE Family Controller',
    'Killer Wireless-n/a/ac 1535 Wireless Network Adapter'
]


export const Table = ({
    headers,
    onClickCPU,
    onClickMem,
    data = [{
        data: {
            system: {
                cpuUsage: "0.00",
                memoryUsage: "0.00"
            },
            processes: [
                {
                    name: "",
                    cpu: "",
                    memory: "",
                    pid: 0
                },
                {
                    name: "",
                    cpu: "",
                    memory: "",
                    pid: 1
                },
            ]
        }
    }],
    isTaskManager,
    isSystemInfo,
    information = {

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
    ipAdress
}) => {
    
    const [isCPUActive, setCPUActive] = useState(false)
    const [isMemActive, setMemActive] = useState(false)
    const [logs, setLogs] = useState('')
    const {sendMessage, lastMessage, readyState} = useWebSocket(`ws://${ipAdress}:443`, { 
        onOpen: () => console.log('Conectado ao servidor cliente via WebSocket.'),
        onClose: () => {
            console.log('Conexão encerrada.');
            sendMessage('close');
        },
        onError: (error) => {
            console.log('Erro:', error);
            sendMessage('error');
        },
        shouldReconnect: () => false, 
    })
    const bytesToGigabytes = (bytes) => {
        const gigabytes = bytes / (1024 ** 3);
        return gigabytes;
    }

    const handleClickCPU = (ip) => {
        onClickCPU(ip)
        setCPUActive(true)
        setMemActive(false)
    }
    const handleClickMEM = (ip) => {
        onClickMem(ip)
        setMemActive(!isMemActive)
        setCPUActive(false)
    }

    useEffect(()=> { 
        
        if(lastMessage?.data) { 
            setLogs((prevData)=> prevData + lastMessage.data)
        }
        console.log(lastMessage)
        return ()=> { 
            sendMessage('close')
        }
    }, [lastMessage])
    
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <>
            {isTaskManager &&

                <TopContent>
                    <div id='Content-CPU'>
                        <div id="div-cpu-percent">
                            <h2>CPU</h2>
                            <h2>0.00%</h2>
                        </div>
                        <div id="div-chart">
                            <Chart/>
                        </div>
                    </div>
                    {/*<div id="cpu-usage" onClick={() => handleClickCPU(information.ip)} visible={isCPUActive}>
                        <h4>USO DA CPU</h4>
                        <h2>{data ? data.map((information) => information.data.system.cpuUsage ? information.data.system.cpuUsage : "") : ""}%</h2>

                    </div>
                    <div id="mem-usage" onClick={() => handleClickMEM(information.ip)} isActive={isMemActive}>
                        <h4>USO DA MEM</h4>
                        <h2>{data ? data.map((information) => information.data.system.memoryUsage ? information.data.system.memoryUsage : "0,0") : ""}%</h2>
                    </div>*/}

                </TopContent>
            }
            {isTaskManager &&
                
                <TableContent>
                    <TableHeader>
                        {headers.map((th) =>
                            <HeaderCell>{th}</HeaderCell>
                        )}
                    </TableHeader>

                    <TableBody>
                        {data ? data.map((information) => information ?
                            information.data.processes.map((process, index) => process.name != "System Idle Process" && process.name != "Memory Compression" ? (

                                <TableRow id="task-row" >
                                    <TableCell id="task-name" key={index}>{process.name}</TableCell>
                                    <TableCell key={index}>{process.cpu}%</TableCell>
                                    <TableCell key={index}>{process.memory}MB</TableCell>
                                    <FloatButton taskkill={true} ip={ipAdress} pid={process.pid}><TableCell key={index}>{process.pid}</TableCell></FloatButton>
                                </TableRow>
                            ) : undefined
                            ) : undefined) : undefined}
                    </TableBody>


                </TableContent>

            }

            {!isTaskManager && isSystemInfo &&
                <TableContent>
                    <TableHeader>
                        {headers.map((th) =>
                            <HeaderCell>{th}</HeaderCell>
                        )}
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell id="information">
                                Host: <p id="type">{information.host ? information.host : "NULL"}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">
                                Processador: <p id="type">{information.processor ? information.processor : "NULL"}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">
                                Memoria:  <p id="type">{information.memory ? bytesToGigabytes(information.memory).toFixed(2) : "0,0"}GB</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">
                                Hard Disk:  <p id="type">{information.hard_disk ? information.hard_disk : "NULL"}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">
                                Sistema(SO): <p id="type">{information.operating_system ? information.operating_system : "NULL"}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">
                                Arch:  <p id="type">{information.arch ? information.arch : "NULL"}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">
                                Release:  <p id="type">{information.release ? information.release : "NULL"}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">
                                Monitores:  <p id="type">{information.monitors ? information.monitors : "NULL"}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information" >
                                IP:  <p id="type">{information.ip ? information.ip : "NULL"}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">
                                MAC:  <p id="type">{information.mac_address ? information.mac_address : "NULL"}</p>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell id="information">
                                Status: <p id="type">{information.status ? information.status : "NULL"}</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableHeader>
                        <HeaderCell>Adaptadores de Rede</HeaderCell>
                    </TableHeader>
                    <TableBody>
                        {console.log(information.network_devices)}
                        {teste.map(devices => <TableRow>
                            <TableCell>{devices}</TableCell>
                        </TableRow>)}
                    </TableBody>
                </TableContent>
            }
        </>
    )
}