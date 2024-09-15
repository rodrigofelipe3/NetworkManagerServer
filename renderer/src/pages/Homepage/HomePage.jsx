import React, { useEffect, useState } from "react";
import { ContainerJSX } from "../../components/Container";
import { GridContent, HeaderContent, InformationContent, StyledButton } from "./style";
import { ComputerCard } from "../../components/ComputerCard";
import { GetData } from "../../services/getData";
import Swal from 'sweetalert2/dist/sweetalert2.js'
const data1 = [
    { id: 1, host: "RODRIGO", ip: "10.10.1.2", mac_address: "4f:5:6f:7f:8f", status: "Conectado" },
    { id: 2, host: "VANESSA", ip: "10.10.1.1", mac_address: "4f:5:6f:7f:2f", status: "Conectado" },
    { id: 3, host: "MARCOS", ip: "10.10.1.3", mac_address: "4f:5:6f:7f:3f", status: "Conectado" },
    { id: 4, host: "GABRIEL", ip: "10.10.1.5", mac_address: "4f:5:6f:7f:6f", status: "Offline" },
    { id: 5, host: "GABRIEL", ip: "10.10.1.5", mac_address: "4f:5:6f:7f:6f", status: "Offline" },
    { id: 6, host: "GABRIEL", ip: "10.10.1.5", mac_address: "4f:5:6f:7f:6f", status: "Offline" },
    { id: 7, host: "GABRIEL", ip: "10.10.1.5", mac_address: "4f:5:6f:7f:6f", status: "Offline" },
    { id: 8, host: "GABRIEL", ip: "10.10.1.5", mac_address: "4f:5:6f:7f:6f", status: "Offline" },
    { id: 9, host: "GABRIEL", ip: "10.10.1.5", mac_address: "4f:5:6f:7f:6f", status: "Offline" },

]

export const HomePage = () => {
    const [viewInformation, setViewInformation] = useState(false)
    const [data, setData] = useState([""])

    const handleGetData = async () => {
        const response = await GetData()

        setData(response)
    }
    useEffect(() => {
        try {
            handleGetData()
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }

    }, [])

    return (
        <>
            <ContainerJSX>
                <HeaderContent>
                    <h1>Computadores Conectados</h1>
                </HeaderContent>
                {!viewInformation && (
                    <GridContent>
                        {data.map((pcs) =>
                            <ComputerCard key={pcs.id} onClick={() => setViewInformation(true)}
                                id={pcs.id}
                                host={pcs.host}
                                ip={pcs.ip}
                                mac_address={pcs.mac_address}
                                status={pcs.status}

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
                        <h1>System Information</h1>
                    </InformationContent>
                )}
            </ContainerJSX>
        </>
    )
}