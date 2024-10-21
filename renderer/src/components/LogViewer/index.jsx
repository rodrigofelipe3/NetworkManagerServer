import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { CmdBody, PromptHeader, CmdContent } from './style';
const iconPrompt = require("../../assets/imagens/prompt-icon.png")


const LogsViewer = ({ipAddress}) => {
    const [logs, setLogs] = useState(['']);
   
    // Conecta ao WebSocket do servidor cliente (troque o IP/porta conforme necessário)
    const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://${ipAddress}:5002`, {
        onOpen: () => console.log('Conectado ao servidor cliente via WebSocket.'),
        onClose: () => sendMessage('close'),
        onError: (error) => sendMessage('error') + console.log(error),
        shouldReconnect: () => true, // Reconnect on disconnection
    });

    useEffect(() => {

        if (lastMessage !== null || lastMessage !== Blob) {
            setLogs((prevLogs) => [...prevLogs, lastMessage]);
        }
    }, [lastMessage]);

    console.log("LastMessage: " + lastMessage)

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    if(connectionStatus === "Closed") { 
        console.log(connectionStatus)
        setLogs([])
    }else if ( connectionStatus === 'Uninstantiated'){ 
        setLogs([])
    }else if ( connectionStatus === 'Closing'){ 
        setLogs([])
    }
    return (
        <>
        <title>Prompt - {connectionStatus}</title>
            <CmdContent>
                {/*<PromptHeader>
                    <div id='titulo-prompt'>
                        <img src={iconPrompt} alt='iconprompt' />
                        <p>Prompt</p></div>
                    <CloseIcon onClick={closeNewWindow}></CloseIcon>
                </PromptHeader>*/}
                <CmdBody>

                    {logs.map((data) =>
                        <p>{data == null ? "" : data.data}</p>
                    )}
                </CmdBody>
            </CmdContent>

        </>

    );
};

export default LogsViewer;
