import React, { useEffect, useState } from "react";
import { HeaderContent, GridContent, Console, CountUpp, DepartmentDiv, ArrowRightIcon } from "./style";
import { ComputerCard } from "../../ComputerCard";

export const ComputerListScreen = ({
    data,
    handleClick,
    recharge,
    setInputValue,
    filter,
}) => {
    const poweroff = data.map((dados) => dados.poweroffhour != 'none' && dados.poweroffhour != null && dados.poweroffhour != '')
    const status = data.map((dados) => dados.status)
    let StatusConected = status.filter(data => data === 'Conectado').length
    let StatusDisconected = status.filter(data => data === 'Offline').length

    const [Conected, setConected] = useState()
    const [shutdownProgramed, setShutdownProgramed] = useState()
    const [Disconected, setDisconected] = useState()
    const [visibility, setVisibility] = useState({});

    useEffect(() => {
        let arrayPowerOff = []
        poweroff.filter((dados) => dados == true ? arrayPowerOff.push(dados) : undefined)
        console.log(arrayPowerOff)
        setConected(StatusConected)
        setDisconected(StatusDisconected)
        setShutdownProgramed(arrayPowerOff.length > 0 ? arrayPowerOff.length : 0)

        // Inicializa todas as seções como visíveis
        const initialVisibility = {};
        departments.forEach((dept) => {
            initialVisibility[dept] = true;
        });
        setVisibility(initialVisibility);

    }, [data])

    const departments = [
        "Suporte",
        "Fiscal",
        "IRPF",
        "Pessoal",
        "Societário",
        "Contabil",
        "Tributário",
        "Comercial",
        "Onboarding",
        "RH",
    ];

    const toggleVisibility = (department) => {
        setVisibility((prevVisibility) => ({
            ...prevVisibility,
            [department]: !prevVisibility[department],
        }));
    };

    const undefinedComputers = filter.filter(
        (pcs) => !pcs.department || pcs.department === ""
    );

    return (
        <>
            <HeaderContent>
                <Console onClick={() => setInputValue("Conectado")}>
                    <h3>CONECTADOS</h3>
                    <CountUpp
                        start={0}
                        end={Conected}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                    />
                </Console>
                <Console onClick={() => setInputValue("Offline")}>
                    <h3>DESCONECTADOS</h3>
                    <CountUpp
                        start={0}
                        end={Disconected}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                    />
                </Console>
                <Console onClick={() => setInputValue('1')}>
                    <h3>DESLIGAMENTO PROGRAMADO</h3>
                    <CountUpp
                        start={0}
                        end={shutdownProgramed}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                    />
                </Console>
            </HeaderContent>
            {departments.map((department) => (
                <DepartmentDiv key={department}>
                    <h2>Setor {department}  
                        <ArrowRightIcon
                            onClick={() => toggleVisibility(department)}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "1rem",
                            }}
                            rotate={visibility[department] ? true : false}
                        />
                    </h2>
                    <GridContent key={department}>
                        {visibility[department] && // Exibe apenas se estiver visível
                            filter.filter(
                                (pcs) => pcs.department === department
                            ).length > 0 ? (
                            filter
                                .filter(
                                    (pcs) => pcs.department === department
                                )
                                .map((pcs) => (
                                    <ComputerCard
                                        key={pcs.id ? pcs.id : "1"}
                                        onClick={() =>
                                            handleClick(
                                                pcs.id,
                                                pcs.ip,
                                                pcs.mac_address
                                            )
                                        }
                                        id={pcs.id ? pcs.id : ""}
                                        user={pcs.user ? pcs.user : ""}
                                        host={pcs.host ? pcs.host : ""}
                                        ip={pcs.ip ? pcs.ip : ""}
                                        mac_address={
                                            pcs.mac_address
                                                ? pcs.mac_address
                                                : ""
                                        }
                                        status={pcs.status ? pcs.status : ""}
                                        recharge={recharge}
                                    />
                                ))
                        ) : visibility[department] && (
                            <h3>Nenhum Computador Registrado</h3>
                        )}
                    </GridContent>
                </DepartmentDiv>
            ))}
            <DepartmentDiv>
                <h2>Setor Outros</h2>
                <GridContent>
                    {undefinedComputers.length > 0 ? (
                        undefinedComputers.map((pcs) => (
                            <ComputerCard
                                key={pcs.id ? pcs.id : "1"}
                                onClick={() =>
                                    handleClick(
                                        pcs.id,
                                        pcs.ip,
                                        pcs.mac_address
                                    )
                                }
                                id={pcs.id ? pcs.id : ""}
                                user={pcs.user ? pcs.user : ""}
                                host={pcs.host ? pcs.host : ""}
                                ip={pcs.ip ? pcs.ip : ""}
                                mac_address={
                                    pcs.mac_address ? pcs.mac_address : ""
                                }
                                status={pcs.status ? pcs.status : ""}
                                recharge={recharge}
                            />
                        ))
                    ) : (
                        <h3>Nenhum Computador Registrado</h3>
                    )}
                </GridContent>
            </DepartmentDiv>
        </>
    )
}
