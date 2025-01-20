import React, { useEffect, useState } from "react";
import { HeaderCell, StopButton, TableBody, TableCell, TableContent, TableHeader, TableRow, TopContent } from "./style";
import { FloatButton } from "../FloatMenu";
import Chart from "../Chart";
import { ReadyState } from "react-use-websocket";
import { useWebSocketContext } from "../../utils/WebSocketProvider";


export const Table = ({
    headers,
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
        temp: 0
    });

    const [Processos, setProcessos] = useState([{ Name: '', Id: '', Memory_MB: '' }])
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
    }, [lastMessage])

    const handleConvertJSON = () => {
        try {
            // Converte a string JSON para um objeto (se necessário)
            const Data = information.network_devices
            const parsedJson = JSON.parse(Data)
            return parsedJson.map(devices => devices.map(devices2 => <TableRow ><TableCell>{devices2}</TableCell></TableRow>))

        } catch (error) {
            console.error('Erro ao converter a string em JSON:', error);
        }
    }

    const handleConvertData = (data) => {
        const [initialData, processesData] = data.split(/,processes:/);

        const initialDataObject = Object.fromEntries(
            initialData.split(',').map(item => {
                const [key, value] = item.split(':');
                return [key, parseFloat(value)];
            })
        );

        if (processesData != undefined) {
            const processes = JSON.parse(processesData)
            setProcessos(processes)
            const { usage, memper, usedmemory, totalmemory, freemem, temp } = initialDataObject;
            setSystemInfo({
                usage,
                memper,
                usedmemory,
                totalmemory,
                freemem,
                temp
            });
        }


    }


    return (
        <>
            {isTaskManager &&

                <TopContent>
                    {connectionStatus == "Open" ? (
                        <div id="StopButton">
                            <h3>Parar Métricas: </h3>
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
                        <div id='Content-CPU'>
                            <div id="div-cpu-temp">
                                <h2>Temperatura da CPU</h2>
                                <h2>{systemInfo.temp}º</h2>
                            </div>
                            <div id="div-chart">
                                <Chart value={systemInfo.temp} startAngle={-90} endAngle={90} />
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
                        {Processos.map((process, index) => process.Name !== "System Idle Process" && process.Name !== "Memory Compression" ? (

                            <TableRow id="task-row" >
                                <TableCell id="task-name" key={index}><FloatButton taskkill={true} ip={ipAdress} pid={process.Id}>{process.Name}</FloatButton></TableCell>
                                <TableCell key={index}> {process.Memory_MB}MB</TableCell>
                                <TableCell key={index}>{process.Id}</TableCell>
                            </TableRow>
                        ) : undefined
                        )}
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
                                Memoria:  <p id="type">{information.memory ? information.memory : "0,0GB"}</p>
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
                        {handleConvertJSON()}
                    </TableBody>
                </TableContent>
            }
        </>
    )
}