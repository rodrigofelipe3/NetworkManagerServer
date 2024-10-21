import React, { useEffect, useState } from "react";
import { HeaderContent, GridContent, Console, CountUpp } from "./style";
import { ComputerCard } from "../../ComputerCard";


export const ComputerListScreen = ({
    data,
    handleClick,
    recharge,
    setInputValue,
    filter,
}) => {
    const poweroff = data.map((dados)=> dados.poweroff)
    const status =  data.map((dados)=> dados.status)
    let StatusConected  = status.filter(data => data === 'Conectado').length
    let StatusDisconected  = status.filter(data => data === 'Offline').length
    let PowerOffProgramed = poweroff.filter(data => data === 1).length
    
    const [Conected, setConected] = useState()
    const [shutdownProgramed, setShutdownProgramed] = useState()
    const [Disconected, setDisconected] = useState()
    useEffect(()=> { 

       setConected(StatusConected)
       setDisconected(StatusDisconected)
       setShutdownProgramed(PowerOffProgramed)
        
    }, [data])

   

    return (
        <>
            <HeaderContent>
                    <Console onClick={()=> setInputValue("Conectado")}> 
                        <h3>CONECTADOS</h3>
                       <CountUpp 
                        start={0}
                        end={Conected}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                       />
                    </Console>
                    <Console onClick={()=> setInputValue("Offline")}>
                        <h3>DESCONECTADOS</h3>
                        <CountUpp 
                        start={0}
                        end={Disconected}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                       />
                    </Console>
                    <Console onClick={()=> setInputValue('1')}>
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
            <GridContent>
                    {filter.length !== 0? 
                        filter.map((pcs) =>
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