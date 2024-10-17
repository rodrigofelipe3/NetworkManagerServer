import styled from "styled-components";


export const CmdContent = styled.div`
    width: 80%;
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
    font-weight: 600;
    padding: 5px;
    padding-left: 40px;
    background-color: #008cff;
    align-items: center;
    display: flex;
    margin: 0 auto;

    p{ 
        padding: 0.500rem;
    }
    img { 
        width: 20px;
    }
`

