import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

export const CmdContent = styled.div`
    //-webkit-app-region: drag;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    justify-content: center;
    overflow-x: hidden;
    
`


export const CmdBody = styled.div `
    background-color: #000;
    color: #fff;
    margin: 0 auto;
    width: 100%;
    height: 500px;
    scrollbar-width: 1rem;
    scrollbar-color: #fff;
    overflow-x: hidden;
    overflow-y: scroll; 
    word-wrap: break-word;

    h2{ 
        padding: 1rem;
    }

    p{ 
        margin: 0.500rem;
    }

    pre { 
        margin-left: 2rem;
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

export const DivInput = styled.div `
    margin-top: 1rem;
    font-size: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    
`
export const PromptInput = styled.input `
    font-size: 1rem;
    padding-left: 0.3rem;
    width: 100%;
    background-color: transparent;
    border-color: transparent;
    outline: none;
    color: #fff;
`