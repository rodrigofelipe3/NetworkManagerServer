import React from "react";
import {useParams} from 'react-router-dom'
import LogsViewer from "../../components/LogViewer";


export const PromptPage = () => { 
    const {ip} = useParams()
    return (<>
        <LogsViewer ipAddress={ip}></LogsViewer>
    </>)
}