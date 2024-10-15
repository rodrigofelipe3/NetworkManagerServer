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

    const [Conected, setConected] = useState(data.length !== 0 && status[0] == "Conectado"? data.length : 0)
    const [shutdownProgramed, setShutdownProgramed] = useState(data.length !== 0 &&  poweroff[0]== 1? data.length : 0)
    const [Disconected, setDisconected] = useState(data.length !== 0 && status[0] !== "Conectado"? data.length : 0)
   
    useEffect(()=> { 

       setConected(data.length !== 0 && status[0] == "Conectado"? data.length : 0)
       setDisconected(data.length !== 0 && status[0] !== "Conectado"? data.length : 0)
       setShutdownProgramed(data.length !== 0 &&  poweroff[0] == 1? data.length : 0)
        
    }, [data])

   

    return (
        <>
            <HeaderContent>
                    <Console onClick={()=> setInputValue("")}> 
                        <h3>CONECTADOS</h3>
                       <CountUpp 
                        start={0}
                        end={Conected}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                       />
                    </Console>
                    <Console onClick={()=> setInputValue("offline")}>
                        <h3>DESCONECTADOS</h3>
                        <CountUpp 
                        start={0}
                        end={Disconected}
                        decimals={undefined}
                        decimal={undefined}
                        duration={2}
                       />
                    </Console>
                    <Console>
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