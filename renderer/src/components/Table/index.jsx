import React, { useEffect, useState } from "react";
import { HeaderCell, TableBody, TableCell, TableContent, TableHeader, TableRow, TopContent } from "./style";
import { FloatButton } from "../FloatMenu";
import Chart from "../Chart";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useWebSocketContext } from "../../utils/WebSocketProvider";

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
    ipAdress,
}) => {

    
    const { lastMessage, readyState } = useWebSocketContext()
    const [formatedMessage, setFormatedMessage] = useState('')
    const [systemInfo, setSystemInfo] = useState({
        usage: 0,
        memper: 0,
        usedMemory: 0,
        totalMemory: 0,
        freeMem: 0,
    });
    useEffect(() => {
        if (lastMessage?.data) {
            const [ usage, memper, usedMemory, totalMemory, freeMem] = lastMessage?.data.match(/[\d.]+/g).map(Number);
            
            setSystemInfo({
                usage,
                memper,
                usedMemory,
                totalMemory,
                freeMem,
            });
        }

    }, [lastMessage])

    const bytesToGigabytes = (bytes) => {
        const gigabytes = bytes / (1024 ** 3);
        return gigabytes;
    }
    return (
        <>
            {isTaskManager &&

                <TopContent>
                    <div id='Content-CPU'>
                        <div id="div-cpu-percent">
                            <h2>CPU</h2>
                            <h2>{systemInfo.usage}%</h2>
                        </div>
                        <div id="div-chart">
                            <Chart value={systemInfo.usage} />
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
                            information.data.processes.map((process, index) => process.name !== "System Idle Process" && process.name !== "Memory Compression" ? (

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