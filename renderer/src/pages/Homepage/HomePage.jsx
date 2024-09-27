import React, { useEffect, useState } from "react";
import { ContainerJSX } from "../../components/Container";
import { GridContent, HeaderContent, InformationContent, StyledButton } from "./style";
import { ComputerCard } from "../../components/ComputerCard";
import { GetData } from "../../services/getData";
import { Table } from "../../components/Table";
import { getProcess } from "../../services/getProcess";
import { getProcessMemory } from "../../services/GetProcessMemory";
import { getComputerById } from "../../services/GetComputerById";
import { Loading } from "../../components/IsLoading";
import { Taskkill } from "../../services/Taskkill";
import swal from "sweetalert"


export const HomePage = () => {
    const [viewInformation, setViewInformation] = useState(false)
    const [adressIp, setAdressip] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [information, setInformation] = useState([{
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
    }])
    const [selectedKey, setSelectedKey] = useState("")
    const [data, setData] = useState([{
        id: "",
        host: "",
        processor: "",
        memory: "",
        operating_system: "",
        arch: "",
        release: "",
        ip: "",
        mac_address: "",
        status: "",
        networkdevices: "",
        networkSpeed: "",

    },
    ])
    const handleGetComputerById = async (id) => { 
        const response = await getComputerById(id)
        if (response.msg){ 
            setData([response.msg])
            console.log(data)
        }else { 
        }
    }

    const handleTaskkill = async (ip, pid) => { 
        const response = await Taskkill(ip, pid)
        if(response.msg) { 
            swal({
                title: "Feito",
                text: response.msg,
                icon: "success",
                timer: 2000
            })
        }else { 
            swal({
                title: "Error",
                text: response.error,
                icon: "error",
                timer: 2000
            })
        }
    }
    const handleGetData = async () => {
        const response = await GetData()
        
        if (response) {
            setData(response)
        } else {
            swal({
                title: "Error",
                text: response.error,
                icon: "error",
                timer: 2000
            })
        }

    }
    const handleGetScreen = async () => { 
        try { 
            fetch(`http://localhost:5000/api/get/screen/${adressIp}/`, {
                method: "POST",
                headers: { 
                    "Content-Type":"application/json"
                },
            })
        }catch(error){ 
            swal({
                title: "Error",
                text: error,
                icon: "error",
                timer: 2000
            })
        }
    }
    const handleGetProcess = async (ip) => {
        
        try {
            const response = await getProcess(ip)
            if (response) {

                setInformation([response])
            }else { 
                swal({
                    title: "Error",
                    text: response.error,
                    icon: "error",
                    timer: 2000
                })
            }
        } catch (err) {
        }
    }
    const handleGetProcessMemory = async (ip) => {
        
        try { 
            const response =  await getProcessMemory(ip)
            if (response) {
                setInformation([response])
            }else {
                swal({
                    title: "Error",
                    text: response.error,
                    icon: "error",
                    timer: 2000
                })
            }
        }catch (error) {
            swal({
                title: "Error",
                text: error,
                icon: "error",
                timer: 2000
            })
        }
    }
    useEffect(() => {
        setIsLoading(true)
        try {
            if(viewInformation == true){ 
                handleGetComputerById(selectedKey)
                setInformation([{
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
                }])
            }else if(viewInformation == false){ 
                handleGetData()
                setInformation([{
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
                }])
            }
           
        } catch (err) {
            
        }finally{ 
            setIsLoading(false)
        }

    }, [viewInformation])

    const handleClick = (pcs, ip) => {

        const keyValue = pcs? pcs : "32";
        setAdressip(ip)
        setSelectedKey(keyValue);
        setViewInformation(true);
    };

    return (
        <>
      
            <ContainerJSX>
            {isLoading && <Loading></Loading>}
                <HeaderContent>
                    <h1>Computadores Conectados</h1>
                </HeaderContent>
                {!viewInformation && (
                    <GridContent>
                    {data.id !== ""? 
                        data.map((pcs) =>
                            <ComputerCard key={pcs.id ? pcs.id : "1"} onClick={() => handleClick(pcs.id, pcs.ip)}
                                id={pcs.id ? pcs.id : ""}
                                host={pcs.host ? pcs.host : ""}
                                ip={pcs.ip ? pcs.ip : ""}
                                mac_address={pcs.mac_address ? pcs.mac_address : ""}
                                status={pcs.status ? pcs.status : ""}
                            />
                        ) : <h5>Nenhum Computador Registrado</h5>} 
                    </GridContent>
                )}
                {viewInformation && (
                    <InformationContent>
                       
                        <div id={"grid-display"}>
                            <div id="systemInformation">
                            <StyledButton onClick={() => setViewInformation(false)}>
                                VOLTAR
                            </StyledButton>
                                <h1>System Information</h1>
                                    {data.id !== ""? data.map((information)=> 
                                     (<Table
                                        isTaskManager={false}
                                        headers={["Information", "Type"]}
                                        isSystemInfo={true}
                                        information={information}
                                    />)
                                   ): <h1>Nenhum dado encontrado!</h1>}
                            </div>
                            <div id="ManagerTask">
                                <div id="manager-buttons">
                                    <StyledButton >Gerenciar</StyledButton>
                                    <StyledButton onClick={() => handleGetScreen()}>Screen</StyledButton>
                                </div>  
                                
                                <Table
                                    onClickMem={handleGetProcessMemory}
                                    onClickCPU={handleGetProcess}
                                    isTaskManager={true}
                                    headers={["Nome", "CPU", "Memory", "PID"]}
                                    data={information}
                                />
                            </div>
                        </div>

                    </InformationContent>
                )}      
            </ContainerJSX>
        </>
    )
}