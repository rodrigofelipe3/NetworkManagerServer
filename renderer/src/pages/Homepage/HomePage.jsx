import React, { useEffect, useState } from "react";
import { ContainerJSX } from "../../components/Container";
import { GetData } from "../../services/server/getData";
import { getProcess } from "../../services/cliente/getProcess";
import { getProcessMemory } from "../../services/cliente/GetProcessMemory";
import { getComputerById } from "../../services/server/GetComputerById";
import { LoadingComponent } from "../../components/IsLoading";
import swal from "sweetalert"
import { InformationScreen } from "../../components/screens/ViewInformation";
import { ComputerListScreen } from "../../components/screens/ListCompScreen";
import { CompHeader } from "../../components/Header";


export const HomePage = () => {
    const [viewInformation, setViewInformation] = useState(false)
    const [adressIp, setAdressip] = useState()
    const [macAdress, setMacAdress] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [InputValue, setInputValue] = useState("")
    const [InputValue2, setInputValue2] = useState("")
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
    const [recharge, setRecharge] = useState(null)
    const [data, setData] = useState([{
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
    ])

    const handleGetComputerById = async (id) => {
        const response = await getComputerById(id)
        if (response.msg) {
            setData([response.msg])

        } else {
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
                    "Content-Type": "application/json"
                },
            })
        } catch (error) {

        }
    }
    const handleGetProcess = async () => {

        try {
            const response = await getProcess(adressIp)
            if (response) {

                setInformation([response])
            } else {
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
            const response = await getProcessMemory(adressIp)
            if (response) {
                setInformation([response])
            } else {
                swal({
                    title: "Error",
                    text: "Erro: " + response.error,
                    icon: "error",
                    timer: 2000
                })
            }
        } catch (error) {
            swal({
                title: "Error",
                text: "Erro: " + error,
                icon: "error",
                timer: 2000
            })
        }
    }
    const closeNewWindow = () => {
        window.api.ClosePrompt();
    }
    const handleClick = (pcs, ip, mac) => {

        const keyValue = pcs ? pcs : "1";
        setAdressip(ip)
        setMacAdress(mac)   
        setSelectedKey(keyValue);
        setViewInformation(true);
    };

    const filteredComputers = data.filter(computer =>
        computer.host.toLowerCase().includes(InputValue.toLowerCase() || InputValue2.toLowerCase()) ||
        computer.status.toLowerCase().includes(InputValue.toLowerCase() || InputValue2.toLowerCase()) ||
        computer.poweroff === Number(InputValue) || Number(InputValue2)
    );


    useEffect(() => {
        setIsLoading(true)
        try {
            if (viewInformation === true) {
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
            } else if (viewInformation === false) {
                //closeNewWindow()
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

        } finally {
            setIsLoading(false)
            setRecharge(false)
        }

    }, [viewInformation, recharge])
    return (
        <>

            {isLoading && <LoadingComponent />}
            <ContainerJSX>
                
                <CompHeader
                    setInputValue={setInputValue}
                    InputValue={InputValue}
                    recharge={setRecharge}
                />
                {!viewInformation && (
                    <ComputerListScreen
                        data={data}
                        setInputValue={setInputValue2}
                        filter={filteredComputers}
                        handleClick={handleClick}
                        recharge={setRecharge}
                    />
                )}
                {viewInformation && (
                    <InformationScreen
                        data={data}
                        information={information}
                        informationScreen={() => setViewInformation(false)}
                        handleGetProcess={handleGetProcess}
                        handleGetProcessMemory={handleGetProcessMemory}
                        handleGetScreen={handleGetScreen}
                        ipAdress={adressIp}
                        macAdress={macAdress}
                        viewInformation={setViewInformation}

                    />
                )}
            </ContainerJSX>
        </>
    )
}