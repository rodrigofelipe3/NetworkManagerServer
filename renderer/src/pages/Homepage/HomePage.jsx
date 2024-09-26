import React, { useEffect, useState } from "react";
import { ContainerJSX } from "../../components/Container";
import { GridContent, HeaderContent, InformationContent, StyledButton } from "./style";
import { ComputerCard } from "../../components/ComputerCard";
import { GetData } from "../../services/getData";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Table } from "../../components/Table";
import { getProcess } from "../../services/getProcess";
import { getProcessMemory } from "../../services/GetProcessMemory";
import { getComputerById } from "../../services/GetComputerById";
import { Loading } from "../../components/IsLoading";



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
            setData(response.msg)
        }else { 
            Swal.fire({ 
                icon: "error",
                title: "Oops...",
                text: response.error,
            })
        }
    }
    const handleGetData = async () => {
        const response = await GetData()
        
        if (response) {
            setData(response)
        } else {
            Swal.fire({ 
                icon: "error",
                title: "Oops...",
                text: "Erro",
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
        }catch(err){ 
            Swal.fire({ 
                icon: "error",
                title: "Oops...",
                text: err,
            })
        }
    }
    const handleGetProcess = async (event) => {
        event.preventDefault()
        try {
            const response = await getProcess("localhost")
            if (response) {

                setInformation([response])
            }else { 
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.error,
                })
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
            })
        }
    }
    const handleGetProcessMemory = async (event) => {
        event.preventDefault() 
        try { 
            const response =  await getProcessMemory("localhost")
            if (response) {
                setInformation([response])
                console.log(information)
            }else { 
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.error,
                })
            }
        }catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
            })
        }
    }
    useEffect(() => {
        setIsLoading(true)
        try {
            if(viewInformation){ 
                handleGetComputerById(selectedKey)
            }else if(!viewInformation){ 
                handleGetData()
            }
            console.log(data)
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
            });
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
                                    <Table
                                        isTaskManager={false}
                                        headers={["Information", "Type"]}
                                        isSystemInfo={true}
                                        information={data}
                                    />
                            </div>
                            <div id="ManagerTask">
                                <StyledButton onClickCapture={handleGetProcess}>Gerenciar</StyledButton>
                                <StyledButton onClick={() => handleGetScreen()}>Screen</StyledButton>
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