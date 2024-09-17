import React, { useEffect, useState } from "react";
import { ContainerJSX } from "../../components/Container";
import { GridContent, HeaderContent, InformationContent, StyledButton } from "./style";
import { ComputerCard } from "../../components/ComputerCard";
import { GetData } from "../../services/getData";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Table } from "../../components/Table";
import { getProcess } from "../../services/getProcess";



export const HomePage = () => {
    const [viewInformation, setViewInformation] = useState(false)
    const [information, setInformation] = useState([{
        data: {
            system: {
                cpuUsage: "0.0",
                memoryUsage: "0.0"
            },
            processes: [{
                name: "chrome.exe",
                cpu: "12.30",
                memory: "500.23",
                pid: 1234
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
    },
    ])

    const handleGetData = async () => {
        const response = await GetData()
        if (response) {
            setData(response)
        } else {

        }

    }

    const handleGetProcess = async (event) => {
        event.preventDefault()
        try {
            const response = await getProcess("10.10.1.45")
            if (response) {
                
                setInformation(response)
                console.log(information)
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
            })
        }
    }
    useEffect(() => {
        try {
            handleGetData()
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
            });
        }

    }, [])

    const handleClick = (pcs) => {

        const keyValue = pcs.id ? pcs.id : "1";
        setSelectedKey(keyValue);
        setViewInformation(true);
    };

    return (
        <>
            <ContainerJSX>
                <HeaderContent>
                    <h1>Computadores Conectados</h1>
                </HeaderContent>
                {!viewInformation && (
                    <GridContent>
                        {data.map((pcs) =>
                            <ComputerCard key={pcs.id ? pcs.id : "1"} onClick={handleClick}
                                id={pcs.id ? pcs.id : "1 "}
                                host={pcs.host ? pcs.host : "1 "}
                                ip={pcs.ip ? pcs.ip : " 1"}
                                mac_address={pcs.mac_address ? pcs.mac_address : " 1"}
                                status={pcs.status ? pcs.status : "1 "}

                            />
                        )}
                    </GridContent>
                )}
                {viewInformation && (
                    <InformationContent>
                        <div id="button-div" style={{ width: "100%" }}>
                            <StyledButton onClick={() => setViewInformation(false)}>
                                VOLTAR
                            </StyledButton>
                        </div>

                        <div id={"grid-display"}>
                            <div id="SystemInformation">
                                <h1>System Information</h1>
                                {data.map((information) =>
                                    <Table
                                        isTaskManager={false}
                                        headers={["Information", "Type"]}
                                        data={data}
                                        isSystemInfo={true}
                                        information={information}
                                    />
                                )}
                            </div>
                            <div id="ManagerTask">
                                <StyledButton onClickCapture={handleGetProcess}>GERENCIAR</StyledButton>
                                <Table
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