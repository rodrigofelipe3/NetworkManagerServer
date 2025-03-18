import React, {useEffect, useState} from "react";
import { ModalBody, ModalBottom, ModalOkButton, ModalCancelButton, ModalContainer, ModalContent, ModalTitle } from "./style";


export const Modal = ({title, children, onClick, view}) => { 

    const handleSetView = () => { 
        view(false)
    }
        const [modalSize, setModalSize] = useState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      
        const updateModalSize = () => {
          setModalSize({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
          });
        };
      
        useEffect(() => {
          updateModalSize();
          window.addEventListener("resize", updateModalSize);
      
          return () => window.removeEventListener("resize", updateModalSize);
        }, []);
        
    return (
        <>
            <ModalContainer width={modalSize.width} height={modalSize.height}> 
                <ModalBody >
                    <ModalTitle>
                        <h2>{title}</h2>
                    </ModalTitle>
                    <ModalContent>
                        {children}
                    </ModalContent>
                    <ModalBottom>
                        <ModalOkButton onClick={onClick}>ACEITAR</ModalOkButton>
                        <ModalCancelButton onClick={handleSetView}>CANCELAR</ModalCancelButton>
                    </ModalBottom>
                </ModalBody>
            </ModalContainer>
        </>
    )
}