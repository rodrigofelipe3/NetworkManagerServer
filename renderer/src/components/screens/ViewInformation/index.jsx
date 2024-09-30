import React, { useState } from "react";
import { StyledButton } from "../../../pages/Homepage/style";
import { InformationContent } from "./style";
import { Table } from "../../Table";


export const InformationScreen = ({
    data = [{
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
    ],
    information = [{
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
    }],
    informationScreen,
    handleGetProcessMemory,
    handleGetProcess,
    handleGetScreen,
    ipAdress
}) => {
    return (
        <>
            <InformationContent>
                <div id="manager-buttons">
                    <StyledButton id="back-button" onClick={() => informationScreen()}>
                        Voltar
                    </StyledButton>
                    <StyledButton id="screen-button" onClick={() => handleGetScreen}>Screen</StyledButton>

                </div>
                <div id={"grid-display"}>
                    <div id="systemInformation">


                        <h1>System Information</h1>
                        {data.id !== "" ?
                            data.map((information) =>
                            (<Table
                                isTaskManager={false}
                                headers={["Information", "Type"]}
                                isSystemInfo={true}
                                information={information}
                            />)
                            ) : <h1>Nenhum dado encontrado!</h1>}
                    </div>
                    <div id="ManagerTask">


                        <Table
                            onClickMem={handleGetProcessMemory}
                            onClickCPU={handleGetProcess}
                            isTaskManager={true}
                            headers={["Nome", "CPU", "Memory", "PID"]}
                            data={information}
                            ipAdress={ipAdress}
                        />
                    </div>
                </div>

            </InformationContent>

        </>
    )
}