import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { CmdBody,  CmdContent } from './style';


const LogsViewer = ({ipAddress}) => {
    const [logs, setLogs] = useState(['']);
   
    const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://${ipAddress}:5002`, {
        
        onOpen: () => console.log('Conectado ao servidor cliente via WebSocket.'),
        onClose: () => console.log(sendMessage('close')) + sendMessage('close'),
        onError: (error) => sendMessage('error') + console.log(error),
        shouldReconnect: () => false, 
    });

    useEffect(() => {
        setLogs([])
        if (lastMessage !== null || lastMessage !== Blob) {
            setLogs((prevLogs) => [...prevLogs, lastMessage]);
        }

    }, [lastMessage]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    
    return (
        <>
            <CmdContent>
                <CmdBody>
                    <p>Computador Conectado: {ipAddress}</p>
                    {logs.map((data) =>
                        <p>{data == null ? "" : data.data}</p>
                    )}
                </CmdBody>
            </CmdContent>

        </>

    );
};

export default LogsViewer;
