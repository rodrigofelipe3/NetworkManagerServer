import React, {useState} from "react";
import { CardBody, CardContent } from "./style";
import { VerticalIcon } from "../screens/ListCompScreen/style";
import { FloatButton } from "../FloatMenu";


export const ComputerCard = ({ id, host, ip, mac_address, status, onClick, user, recharge}) => { 

    return (
        <>
        <FloatButton ip={ip} taskkill={false} recharge={recharge}>
           <CardBody key={id} onClick={onClick}>
            <CardContent>
                <div id="img-content">
                    <img  src={status == "Conectado"? require("../../assets/imagens/conected.png") : require("../../assets/imagens/disconected.png")} alt="connected/disconnected"/>
                </div>
                <div id="info-content">
                    <h3>Host: {host}</h3>
                    <h3>Usuário: {user}</h3>
                    <h3>IP: {ip}</h3>
                    <h3>Mac: {mac_address}</h3>
                    <h3>Status: {status}</h3>
                </div>  
            </CardContent>
           </CardBody>
        </FloatButton>
        </>
    )
}