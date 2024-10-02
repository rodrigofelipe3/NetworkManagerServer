import React, { useEffect, useState } from "react";
import { ContainerJSX } from "../../components/Container";
import { GetData } from "../../services/server/getData";
import { getProcess } from "../../services/cliente/getProcess";
import { getProcessMemory } from "../../services/cliente/GetProcessMemory";
import { getComputerById } from "../../services/server/GetComputerById";
import { Loading } from "../../components/IsLoading";
import swal from "sweetalert"
import { InformationScreen } from "../../components/screens/ViewInformation";
import { ComputerListScreen } from "../../components/screens/ListCompScreen";
import { CompHeader } from "../../components/Header";


export const HomePage = () => {
    const [viewInformation, setViewInformation] = useState(false)
    const [adressIp, setAdressip] = useState(null)
    const [macAdress, setMacAdress] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [InputValue, setInputValue] = useState("")
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
        network_devices: "",

    },
    ])
    
    const handleGetComputerById = async (id) => { 
        const response = await getComputerById(id)
        if (response.msg){ 
            setData([response.msg])
            
        }else { 
            swal({
                title: "Oops...",
                text: "Error: " + response.error,
                icon: "error",
                timer: 2000
            })
        }
    }

    const handleGetData = async () => {
        const response = await GetData()
        
        if (response.error) {
            swal({
                title: "Oops..",
                text: "Error " + response.error,
                icon: "error",
                timer: 2000
            })

        } else {
            setData(response)
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
            
        }
    }
    const handleGetProcess = async () => {
        
        try {
            const response = await getProcess(adressIp)
            if (response) {

                setInformation([response])
            }else { 
                swal({
                    title: "Error",
                    text: "Error: " + response.error,
                    icon: "error",
                    timer: 2000
                })
            }
        } catch (err) {
        }
    }
    const handleGetProcessMemory = async () => {
        
        try { 
            const response =  await getProcessMemory(adressIp)
            if (response) {
                setInformation([response])
            }else {
                swal({
                    title: "Error",
                    text: "Erro: " + response.error,
                    icon: "error",
                    timer: 2000
                })
            }
        }catch (error) {
            swal({
                title: "Error",
                text: "Erro: " + error,
                icon: "error",
                timer: 2000
            })
        }
    }
    const handleClick = (pcs, ip, mac) => {

        const keyValue = pcs? pcs : "1";
        setAdressip(ip)
        setMacAdress(mac)
        setSelectedKey(keyValue);
        setViewInformation(true);
    };

    const filteredComputers = data.filter(computer => 
        computer.host.toLowerCase().includes(InputValue.toLowerCase())
    );
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

    return (
        <>
            
            {isLoading && <Loading></Loading>}
            <ContainerJSX>
                <CompHeader
                    setInputValue={setInputValue}
                    InputValue={InputValue}
                />
                {!viewInformation && (
                    <ComputerListScreen
                    data={filteredComputers}
                    handleClick={handleClick}
                    />
                )}
                {viewInformation && (
                    <InformationScreen 
                        data={data}
                        information={information}
                        informationScreen={()=> setViewInformation(false)}
                        handleGetProcess={handleGetProcess}
                        handleGetProcessMemory={handleGetProcessMemory}
                        handleGetScreen={handleGetScreen}
                        ipAdress={adressIp}
                        macAdress={macAdress}
                    />
                )}      
            </ContainerJSX>
        </>
    )
}