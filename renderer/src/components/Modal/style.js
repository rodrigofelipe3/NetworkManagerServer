import styled from "styled-components";


export const ModalContainer = styled.div `
    position: absolute;
    top: 12%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
`

export const ModalBody = styled.div `
    position: absolute;
    left: 25%;
    top: 35%;
    width: 50%;
    height: 53%;
    background-color: #fff;
    z-index: 10000;
    overflow: hidden;
`

export const ModalTitle = styled.div `
    width: 100%;
    display: flex;
    height: 30px;
    background-color: #0056c6;
    padding: 25px;
    align-items: center;
    
    h2 { 
        color: #fff;
        padding: 10px;
    }
`

export const ModalContent = styled.div `
    width: 100%;
    padding: 35px;
`


export const ModalBottom = styled.footer`
    width: 100%;
    position: absolute;
    bottom: 0;
    align-content: center;
    padding: 25px;
`

export const ModalOkButton = styled.button `
    padding: 13px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #0056c6;
    border-radius: 5px;
    font-weight: 700;
    border: none;
    color: #fff;

    &:hover{  
        background-color: #124aa5;
    }
`

export const ModalCancelButton = styled.button `
    padding: 13px;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 700;
    background-color: #a8a8a8;
    border-radius: 5px;
    border: none;
    color: #fff;

    &:hover{  
        background-color: #545454;
    }
`