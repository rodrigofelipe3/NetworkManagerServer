import React, { useState } from "react";
import { HeaderContent, GridContent, Console, CountUpp } from "./style";
import { ComputerCard } from "../../ComputerCard";


export const ComputerListScreen = ({
    data,
    handleClick,
    recharge
}) => {
    const [dataLength, setDataLength] = useState(data.length? data.length : 0)
    

    return (
        <>
            <HeaderContent>
                    <Console>
                        <h3>CONECTADOS</h3>
                       <CountUpp 
                        start={0}
                        end={dataLength}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                       />
                    </Console>
                    <Console>
                        <h3>DESCONECTADOS</h3>
                        <CountUpp 
                        start={0}
                        end={dataLength}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                       />
                    </Console>
                    <Console>
                        <h3>DESLIGAMENTO PROGRAMADO</h3>
                        <CountUpp 
                        start={0}
                        end={dataLength}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                       />
                    </Console>
            </HeaderContent>
            <GridContent>
                    {data.id !== ""? 
                        data.map((pcs) =>
                            <ComputerCard 
                                key={pcs.id ? pcs.id : "1"} 
                                onClick={() => handleClick(pcs.id, pcs.ip, pcs.mac_address)}
                                id={pcs.id ? pcs.id : ""}
                                user={pcs.user? pcs.user: ""}
                                host={pcs.host ? pcs.host : ""}
                                ip={pcs.ip ? pcs.ip : ""}
                                mac_address={pcs.mac_address ? pcs.mac_address : ""}
                                status={pcs.status ? pcs.status : ""}
                                recharge={recharge}
                            />
                        ) : <h5>Nenhum Computador Registrado</h5>} 
            </GridContent>
        </>
    )
}