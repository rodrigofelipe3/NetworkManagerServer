import React from "react";
import { HeaderCell, TableBody, TableCell, TableContent, TableHeader, TableRow, TopContent } from "./style";




export const Table = ({
    headers,
    data,
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
    return (
        <>
            {isTaskManager && 
                <TopContent>
                    <div id="cpu-usage">
                        <h4>CPU USAGE</h4>
                        <h2>{data? data.map((information) => information.system.cpuUsage): ""}%</h2>

                    </div>
                    <div id="mem-usage">
                        <h4>MEM USAGE</h4>
                        <h2>{data? data.map((information) => information.system.memoryUsage): ""}%</h2>
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
                        {data.map((information) =>
                            information.processes.map((process, index) =>
                                <TableRow>
                                    <TableCell key={index}>{process.name}</TableCell>
                                    <TableCell key={index}>{process.cpu}</TableCell>
                                    <TableCell key={index}>{process.memory}</TableCell>
                                    <TableCell key={index}>{process.pid}</TableCell>
                                </TableRow>
                            ))}
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
                            <TableCell id="type">{information.host}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Processador: </TableCell>
                            <TableCell id="type">{information.processor}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Memoria: </TableCell>
                            <TableCell id="type">{information.memory}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Sistema(SO): </TableCell>
                            <TableCell id="type">{information.operating_system}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Arch: </TableCell>
                            <TableCell id="type">{information.arch}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Release:</TableCell>
                            <TableCell id="type">{information.release}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information" >IP: </TableCell>
                            <TableCell id="type">{information.ip}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">MAC: </TableCell>
                            <TableCell id="type">{information.mac_address}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="information">Status: </TableCell>
                            <TableCell id="type">{information.status}</TableCell>
                        </TableRow>

                    </TableBody>
                </TableContent>
            }
        </>
    )
}