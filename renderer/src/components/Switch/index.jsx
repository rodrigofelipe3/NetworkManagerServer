import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { CmdKey } from "../../services/cliente/Command";
import { useWebSocketContext } from "../../utils/WebSocketProvider";

export const SwitchLabels = ({ ipAdress, Checked }) => {
    const [isChecked, setIsChecked] = useState(false)
    const {sendMessage} = useWebSocketContext()
    const handleOnChange = () => {
        setIsChecked(!isChecked)
        if (isChecked == false) {
            Checked(true)
            const options = {
                type: "information",
            }
            CmdKey(ipAdress, options)
        }else { 
            Checked(false)
            alert('enviando mensagem')
            sendMessage('close')
        }

    }

    return (<>
        <Switch
            height={20}
            handleDiameter={20}
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={() => handleOnChange()}
            checked={isChecked}
        />
    </>)
}