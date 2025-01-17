import React, { useEffect, useState } from "react";
import { HeaderCell,  StopButton, TableBody, TableCell, TableContent, TableHeader, TableRow, TopContent } from "./style";
import { FloatButton } from "../FloatMenu";
import Chart from "../Chart";
import { ReadyState } from "react-use-websocket";
import { useWebSocketContext } from "../../utils/WebSocketProvider";

const teste = [
    'Realtek PCIe GbE Family Controller',
    'Killer Wireless-n/a/ac 1535 Wireless Network Adapter'
]


export const Table = ({
    Recharge,
    headers,
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
        network_devices: [''],
        poweroff: '',
        poweroffhour: ""
    },
    ipAdress,
}) => {


    const { lastMessage, readyState, sendMessage } = useWebSocketContext()
    const [systemInfo, setSystemInfo] = useState({
        usage: 0,
        memper: 0,
        usedmemory: 0,
        totalmemory: 0,
        freemem: 0,
    });

    const [Processos, setProcessos] = useState([{ Name: '', Id: '', Memory_MB: '' }])
    const [networkDevices, setNetworkDevices] = useState([]);
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];



    useEffect(() => {
        if (lastMessage?.data) {

            handleConvertData(lastMessage?.data)
        }
        if (connectionStatus == 'Connecting') sendMessage(JSON.stringify({ type: 'authenticate', userId: String(ipAdress) }))
            if (information ) {
                try {
                    // Converte a string JSON para um objeto (se necessário)
                    
                    const parsedNetworkAdapters = JSON.parse(information.network_adapters);
                    // Filtra os dispositivos de rede para incluir apenas "Ethernet" e "Wi-Fi"
                    const filteredDevices = parsedNetworkAdapters
                        .filter((device) =>
                            device.NetConnectionID &&
                            (device.NetConnectionID === 'Ethernet' || device.NetConnectionID === 'Wi-Fi')
                        )
                        .map((device) => device.Name);
                        
                    setNetworkDevices(filteredDevices);

                   
                } catch (error) {
                    console.error('Erro ao converter a string em JSON:', error);
                }
            }
            console.log(networkDevices)
    }, [lastMessage, Recharge])

    const handleConvertData = (data) => {
        const [initialData, processesData] = data.split(/,processes:/);

        const initialDataObject = Object.fromEntries(
            initialData.split(',').map(item => {
                const [key, value] = item.split(':');
                return [key, parseFloat(value)];
            })
        );

        const processes = JSON.parse(processesData);
        setProcessos(processes)
        const { usage, memper, usedmemory, totalmemory, freemem } = initialDataObject;
        setSystemInfo({
            usage,
            memper,
            usedmemory,
            totalmemory,
            freemem,
        });

    }

    const bytesToGigabytes = (bytes) => {
        const gigabytes = bytes / (1024 ** 3);
        return gigabytes;
    }
    return (
        <>
            {isTaskManager &&

                <TopContent>
                    {connectionStatus == "Open" ? (
                        <div id="StopButton">
                            <h3>Parar: </h3>
                            <StopButton onClick={() => sendMessage('close')} />
                        </div>
                    ) : undefined}
                    <div id="DisplayGrid">
                        <div id='Content-CPU'>
                            <div id="div-cpu-percent">
                                <h2>CPU</h2>
                                <h2>{systemInfo.usage}%</h2>
                            </div>
                            <div id="div-chart">
                                <Chart value={systemInfo.usage} />
                            </div>
                        </div>
                        <div id='Content-Memory'>
                            <div id="div-memory-percent">
                                <h2 style={{ marginBottom: '0' }}>RAM</h2>
                                <h2 style={{ marginTop: '0' }}>{systemInfo.memper ? systemInfo.memper : 0}%</h2>
                                <h3>FREE RAM</h3>
                                <h2 style={{ marginTop: '0' }}>{systemInfo.freemem ? systemInfo.freemem : 0}GB</h2>
                            </div>
                            <div id="div-chart">
                                <Chart value={systemInfo.memper ? parseInt(systemInfo.memper) : 0} />
                            </div>
                        </div>
                    </div>

                </TopContent>


            }
            {isTaskManager &&

                <TableContent>
                    <TableHeader>
                        {headers.map((th) =>
                            <HeaderCell >{th}</HeaderCell>
                        )}
                    </TableHeader>

                    <TableBody>
                        {data ? data.map((information) => information ?
                            Processos.map((process, index) => process.Name !== "System Idle Process" && process.Name !== "Memory Compression" ? (

                                <TableRow id="task-row" >
                                    <TableCell id="task-name" key={index}>{process.Name}</TableCell>
                                    <TableCell key={index}>{process.Memory_MB}MB</TableCell>
                                    <FloatButton taskkill={true} ip={ipAdress} pid={process.Id}><TableCell key={index}>{process.Id}</TableCell></FloatButton>
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
                            <HeaderCell style={{ fontSize: '1.5rem' }}>{th}</HeaderCell>
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
                    {networkDevices.length > 0 ? (
                                networkDevices.map((device, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{device}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell>Nenhum adaptador de rede encontrado</TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </TableContent>
            }
        </>
    )
}