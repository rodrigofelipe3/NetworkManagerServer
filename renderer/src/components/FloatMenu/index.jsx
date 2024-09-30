import React, {useState, useEffect} from "react";
import { Menu, MenuItem } from "./style";
import swal from "sweetalert";
import { Taskkill } from "../../services/Taskkill";
export const FloatButton = ({
    children,
    pid,
    ip
}) => {
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    const handleTaskkill = async (ip, pid) => { 
        const response = await Taskkill(ip, pid)
        if(response.msg) { 
            swal({
                title: "Feito",
                text:  " " + response.msg,
                icon: "success",
                timer: 2000
            })
        }else { 
            swal({
                title: "Oops",
                text: "Erro: " + response.error,
                icon: "error",
                timer: 2000
            })
        }
    }

    useEffect(() => {
        const handleClickOutside = () => setVisible(false);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.pageX, y: e.pageY });
        setVisible(true);
    };
    return (
        <>
            <div onContextMenu={handleContextMenu} style={{width: "100%", display: "flex"}}>
                
                <Menu top={menuPosition.y} left={menuPosition.x} visible={visible}>
                    <MenuItem onClick={() => handleTaskkill(ip, pid)}>Finalizar tarefa</MenuItem>
                </Menu>
                {children}
            </div>
        </>
    )
}