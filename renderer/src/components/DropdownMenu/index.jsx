import React, {useState, useEffect}from "react";
import { DropdownBody, DropdownItem, DropdownMenu } from "./style";

export const DropDownMenu = ({
    isVisible,
    children,

}) => {
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    

   const handleContextMenu = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.pageX, y: e.pageY });
    };

    return (
        <>
            <DropdownBody onContextMenu={handleContextMenu} >
                <DropdownMenu top={menuPosition.y} left={menuPosition.x} visible={isVisible}>
                    {children}
                </DropdownMenu>
            </DropdownBody>
        </>
    )
}