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
      
        // Função para atualizar o tamanho do modal
        const updateModalSize = () => {
          setModalSize({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
          });
        };
      
        useEffect(() => {
          // Atualiza o tamanho inicial do modal
          updateModalSize();
      
          // Adiciona o evento resize para redimensionamento em tempo real
          window.addEventListener("resize", updateModalSize);
      
          // Remove o evento ao desmontar o componente
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