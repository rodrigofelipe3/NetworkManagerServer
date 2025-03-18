import React, { createContext, useContext, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children, ipAddress, connectionError}) => {
    const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://${ipAddress}:443`, {
        onOpen: () => {
            console.log('Conectado ao servidor cliente via WebSocket.')
        },
        onClose: () => {
            console.log('Conexão encerrada.');
        },
        onError: (error) => {
            console.log('Erro:', error);
            connectionError(true);
        },
        shouldReconnect: () => true,
    });

    useEffect(()=> {
        return ()=> { 
            sendMessage('close')
        }
    }, [])

    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState}}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
