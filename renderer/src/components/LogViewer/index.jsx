import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { CmdBody, CmdContent } from './style';


const LogsViewer = React.memo(({ ipAddress }) => {
    const [logs, setLogs] = useState(''); // Armazena a saída completa como string
    const [PortConnection, setPortConnection] = useState(0)
    const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://${ipAddress}`, {
        onOpen: () => {if (ipAddress) {
            const Port = ipAddress.split(':')
            console.log(Port)
            setPortConnection(Port[1])
            
        }
        console.log(PortConnection)},
        onClose: () => {
            console.log('Conexão encerrada.');
            sendMessage('close');
        },
        onError: (error) => {
            console.log('Erro:', error);
        },
        shouldReconnect: () => false,
    });

    // Atualiza os logs ao receber novas mensagens
    useEffect(() => {
        if (lastMessage?.data) {
            setLogs((prevLogs) => prevLogs + lastMessage.data + '\n'); // Adiciona nova mensagem com quebra de linha
        }
        
        return () => {
            sendMessage('close')
        }
    }, [lastMessage]);

    // Status da conexão
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <CmdContent>
            <CmdBody>
                {PortConnection != 444 && (
                    <>
                        <p>
                            Computador Conectado: {ipAddress} - Socket Connection Status: {connectionStatus}
                        </p>
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                            {logs}
                        </pre>
                    </>
                    )}
            </CmdBody>
        </CmdContent>
    );
});

export default LogsViewer;
