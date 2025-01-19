import React, { useEffect, useState } from "react";
import { InformationContent } from "./style";
import { Table } from "../../Table";
import { SideBar } from "../../Sidebar";
import { WebSocketProvider } from "../../../utils/WebSocketProvider";
import AlertComponent from "../../Alert";
import { LoadingComponent } from "../../IsLoading";
import { getComputerById } from "../../../services/server/GetComputerById";
import swal from "sweetalert";

export const InformationScreen = ({
    selectedKey,
    data = [{

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
    ],
    ipAdress,
    macAdress,
    viewInformation,
}) => {
    const [connectionError, setConnectionError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dataById, setDataById] = useState([{

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
    ],)
    const handleGetComputerById = async (id) => {
        const response = await getComputerById(id)
        if (response.msg) {
            
            setDataById(response.msg)
        } else {
            swal({
                title: "Oops...",
                text: "Error: " + response.error,
                icon: "error",
                timer: 2000
            })
        }
    }

    useEffect(() => {
        setIsLoading(true)
        try {
            handleGetComputerById(selectedKey)
        } catch (e) {
            console.error(e)
        }finally{ 
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            {isLoading && <LoadingComponent />}
            {!isLoading &&
                <>
                    <SideBar collapsed={true} macAddress={macAdress} ipAddress={ipAdress} viewInformation={viewInformation} />
                    <WebSocketProvider ipAddress={ipAdress} connectionError={setConnectionError}>
                        <InformationContent>
                            {connectionError && <AlertComponent msg={'Erro ao estabelecer métricas com o Computador Cliente'} opened={connectionError} setConnectionErr={setConnectionError} />}
                            <div id={"grid-display"}>
                                <div id="systemInformation">
                                    {dataById.id !== "" ?                                       (<Table
                                                isTaskManager={false}
                                                headers={["Informações do Sistema"]}
                                                isSystemInfo={true}
                                                information={dataById}
                                            />) 
                                        : <h1>Nenhum dado encontrado!</h1>}
                                </div>
                                <div id="ManagerTask">
                                    <Table
                                        isTaskManager={true}
                                        headers={["Nome", "Memory", "PID"]}
                                        ipAdress={ipAdress}
                                    />
                                </div>
                            </div>

                        </InformationContent>
                    </WebSocketProvider>
                </>
            }

        </>
    )
}