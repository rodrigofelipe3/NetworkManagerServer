import React from "react";
import { HeaderContent, GridContent, Console, CountUpp } from "./style";
import { ComputerCard } from "../../ComputerCard";

export const ComputerListScreen = ({
    data,
    handleClick
}) => {
    return (
        <>
            <HeaderContent>
                    <Console>
                        <h3>CONECTADOS</h3>
                       <CountUpp 
                        start={0}
                        end={data.length}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                       />
                    </Console>
                    <Console>
                        <h3>DESCONECTADOS</h3>
                        <CountUpp 
                        start={0}
                        end={data.length}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                       />
                    </Console>
                    <Console>
                        <h3>DESL. PROGRAMADO</h3>
                        <CountUpp 
                        start={0}
                        end={data.length}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                       />
                    </Console>
            </HeaderContent>
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
        </>
    )
}