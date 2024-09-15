import React from "react";
import { CardBody, CardContent } from "./style";


export const ComputerCard = ({ id, host, ip, mac_address, status, onClick}) => { 

    return (
        <>
           <CardBody key={id} onClick={onClick}>
            <CardContent>
                <img  src={status == "Conectado"? require("../../assets/imagens/conected.png") : require("../../assets/imagens/disconected.png")} alt="https://www.needpix.com/photo/918050/" />
                <h3 >Host: {host}</h3>
                <h3 >IP: {ip}</h3>
                <h3>Mac: {mac_address}</h3>
                <h3 >Status: {status}</h3>
            </CardContent>
           </CardBody>
        </>
    )
}