import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

export const CmdContent = styled.div`
    //-webkit-app-region: drag;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    justify-content: center;
    border: solid 1px #fff;
    overflow-x: hidden;
    
`


export const CmdBody = styled.div `
    background-color: #000;
    color: #fff;
    margin: 0 auto;
    width: 100%;
    height: 500px;
    overflow-x: hidden;
    overflow-y: scroll; 
    word-wrap: break-word;

    h2{ 
        padding: 1rem;
    }

    p{ 
        margin: 0.500rem;
    }
`

export const PromptHeader = styled.header `
    width: 100%;
    color: #fff;
    font-weight: 500;
    background-color: #008cff;
    justify-content: space-between;
    align-items: center;
    display: flex;
    margin: 0 auto;
    
    #titulo-prompt{ 
        display: flex;
        align-items: center;
        margin-left: 1rem;
    }

    p{ 
        padding: 0.500rem;
    }
    img { 
        width: 20px;
        height: 100%;
    }

    

`
export const CloseIcon = styled(IoMdClose)`
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 0.7rem;
    font-size: 1.3rem;
    color: #fff;
    cursor: pointer;

    &:hover { 
        background-color: red;
    }
`
