import React, {useEffect, useState} from "react";
import { ModalBody, ModalBottom, ModalOkButton, ModalCancelButton, ModalContainer, ModalContent, ModalTitle } from "./style";


export const Modal = ({title, children, onClick, view}) => { 
    return (
        <>
            <ModalContainer> 
                <ModalBody>
                    <ModalTitle>
                        <h2>{title}</h2>
                    </ModalTitle>
                    <ModalContent>
                        {children}
                    </ModalContent>
                    <ModalBottom>
                        <ModalOkButton onClick={onClick}>ACEITAR</ModalOkButton>
                        <ModalCancelButton onClick={()=> {view = false}}>CANCELAR</ModalCancelButton>
                    </ModalBottom>
                </ModalBody>
            </ModalContainer>
        </>
    )
}