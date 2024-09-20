import React from "react";
import { HeaderCell, TableBody, TableCell, TableContent, TableHeader, TableRow, TopContent } from "./style";
import { StyledButton } from "../../pages/Homepage/style";


const data1 = [ {
    data: {
        system: {
            cpuUsage: "6.24",
            memoryUsage: "56.67"
        },
        processes: [
        {
            name: "System Idle Process",
            cpu: "96.09",
            memory: "0.00",
            pid: 0
        },
    ]
}
}]

export const Table = ({
    headers,
    onClickCPU,
    onClickMem,
    data = [ {
        data: {
            system: {
                cpuUsage: "6.24",
                memoryUsage: "56.67"
            },
             processes: [
            {
                name: "System Idle Process",
                cpu: "96.09",
                memory: "0.00",
                pid: 0
            },
            {
                name: "Mobi Leucotron.exe",
                cpu: "0.57",
                memory: "1.16",
                pid: 12896
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
    }
}) => {
    const bytesToGigabytes = (bytes) => {
        const gigabytes = bytes / (1024 ** 3); // Divide por 1024³ para converter para GB
        return gigabytes;
    }

    return (
        <>
            {isTaskManager && 
            
                <TopContent>
                    
                    <div id="cpu-usage" onClickCapture={onClickCPU}>
                        <h4>CPU USAGE</h4>
                        <h2>{data? data.map((information) => information.data.system.cpuUsage? information.data.system.cpuUsage : ""): ""}%</h2>

                    </div>
                    <div id="mem-usage" onClickCapture={onClickMem}>
                        <h4>MEM USAGE</h4>
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
                                <TableRow>
                                    <TableCell id="task-name" key={index}>{process.name}</TableCell>
                                    <TableCell key={index}>{process.cpu}%</TableCell>
                                    <TableCell key={index}>{process.memory}MB</TableCell>
                                    <TableCell key={index}>{process.pid}</TableCell>
                                </TableRow>) : undefined
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
                            <TableCell id="information">Status: </TableCell>
                            <TableCell id="type">{information.status? information.status : "NULL"}</TableCell>
                        </TableRow>

                    </TableBody>
                </TableContent>
            }
        </>
    )
}