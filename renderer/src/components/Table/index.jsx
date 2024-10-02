import React, { useEffect, useState } from "react";
import { HeaderCell, TableBody, TableCell, TableContent, TableHeader, TableRow, TopContent } from "./style";
import { FloatButton } from "../FloatMenu";
import { getComputerById } from "../../services/server/GetComputerById";



export const Table = ({
    headers,
    onClickCPU,
    onClickMem,
    data = [ {
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
            operating_system: "",
            arch: "",
            release: "",
            ip: "", 
            mac_address: "", 
            status: "" ,
            network_devices: ''
    },
    ipAdress
}) => {
    const [isCPUActive, setCPUActive] = useState(false)
    const [isMemActive, setMemActive] = useState(false)
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

    console.log("CPU IS ACTIVE?: " + isCPUActive)
    return (
        <>
            {isTaskManager && 
            
                <TopContent>
                    
                    <div id="cpu-usage" onClick={()=> handleClickCPU(information.ip)} visible={isCPUActive}>
                        <h4>USO DA CPU</h4>
                        <h2>{data? data.map((information) => information.data.system.cpuUsage? information.data.system.cpuUsage : ""): ""}%</h2>

                    </div>
                    <div id="mem-usage" onClick={() => handleClickMEM(information.ip)} isActive={isMemActive}>
                        <h4>USO DA MEM</h4>
                        <h2>{data? data.map((information) => information.data.system.memoryUsage? information.data.system.memoryUsage : "0,0" ): ""}%</h2>
                    </div>

                </TopContent>
            }
            {isTaskManager && 
                
                <TableContent>
                    <TableHeader>
                        {headers.map((th)=> 
                            <HeaderCell>{th}</HeaderCell>
                        )}
                    </TableHeader>
                    
                    <TableBody>
                        {data?data.map((information) => information? 
                            information.data.processes.map((process, index) => process.name != "System Idle Process"  &&  process.name != "Memory Compression"? (
                                
                                    <TableRow id="task-row" >
                                        <TableCell id="task-name" key={index}>{process.name}</TableCell>
                                        <TableCell key={index}>{process.cpu}%</TableCell>
                                        <TableCell key={index}>{process.memory}MB</TableCell>
                                        <FloatButton taskkill={true} ip={ipAdress} pid={ process.pid}><TableCell key={index}>{process.pid}</TableCell></FloatButton>
                                    </TableRow>
                                ) : undefined
                            ): undefined): undefined}
                    </TableBody>
                    
                    
                </TableContent>
              
            }
            
            {!isTaskManager && isSystemInfo && 
                <TableContent>
                    <TableHeader>
                        {headers.map((th)=> 
                            <HeaderCell>{th}</HeaderCell>
                        )}
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell id="information">Host: </TableCell>
                            <TableCell id="type">{information.host? information.host : "NULL"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Processador: </TableCell>
                            <TableCell id="type">{information.processor? information.processor : "NULL"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Memoria: </TableCell>
                            <TableCell id="type">{information.memory? bytesToGigabytes(information.memory).toFixed(2) : "0,0"}GB</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Sistema(SO): </TableCell>
                            <TableCell id="type">{information.operating_system? information.operating_system : "NULL"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Arch: </TableCell>
                            <TableCell id="type">{information.arch? information.arch : "NULL"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Release:</TableCell>
                            <TableCell id="type">{information.release? information.release : "NULL"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information" >IP: </TableCell>
                            <TableCell id="type">{information.ip? information.ip : "NULL"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">MAC: </TableCell>
                            <TableCell id="type">{information.mac_address? information.mac_address : "NULL"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Adaptadores de Rede: </TableCell>
                            <TableCell id="type">{information.network_devices? information.network_devices.replace(", Loopback Pseudo-Interface 1", "") : "NULL"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Status: </TableCell>
                            <TableCell id="type">{information.status? information.status : "NULL"}</TableCell>
                        </TableRow>

                    </TableBody>
                </TableContent>
            }
        </>
    )
}