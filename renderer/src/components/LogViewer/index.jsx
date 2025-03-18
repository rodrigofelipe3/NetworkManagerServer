import React, { useState, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { CmdBody, CmdContent, DivInput, PromptInput } from './style';

const LogsViewer = React.memo(({ ipAddress, type}) => {
    const [logs, setLogs] = useState(''); // Armazena a saída completa como string
    const [viewInput, setViewInput] = useState(true)
    const messagesEndRef = useRef(null);
    const promptRef = useRef(null)
    const [InputValue, setInputValue] = useState({ type: type, command: '' })

    const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://${ipAddress}/${type}`, {
        onOpen: () => { console.log('COnexão estabelecida com o servidor') },
        onClose: () => {
            console.log('Conexão encerrada.');
        },
        onError: (error) => {
            console.log('Erro:', error);
        },
        shouldReconnect: () => true,
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setInputValue((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (lastMessage?.data) {
            console.log(lastMessage?.data)
            setLogs((prevLogs) => prevLogs + lastMessage.data + '\n');
        }

        if (lastMessage?.data == 'await') setViewInput(false)
        else if (lastMessage?.data !== 'await') {
            setViewInput(true)
            
        }
    }, [lastMessage]);

    useEffect(()=> { 
        if(viewInput && promptRef.current) { 
            promptRef.current.focus()
        }
        scrollToBottom()
    }, [logs, viewInput])

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
                <p>
                    Computador Conectado: {ipAddress} - Socket Connection Status: {connectionStatus}
                </p>
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {logs}
                </pre>
                {viewInput &&
                    <DivInput ref={messagesEndRef}>C:/Windows/System32>
                        <PromptInput ref={promptRef} type="text" placeholder='' onChange={handleOnChange} value={InputValue.command} name='command' onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault()
                                sendMessage(JSON.stringify(InputValue))
                                setInputValue({ type: 'CLI', command: '' })
                                setViewInput(false)
                            }
                        }} />
                    </DivInput>
                }


            </CmdBody>
        </CmdContent>
    );
});

export default LogsViewer;
