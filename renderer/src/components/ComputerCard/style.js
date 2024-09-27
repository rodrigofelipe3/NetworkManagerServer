import styled from "styled-components";


export const CardBody = styled.div `
    
    height: 9rem;
    //display: flex;
    color: #d6d6d6;
    margin: 0.500rem;
    background-color: #242424;
    /*justify-content: center;
    align-items: center;*/
    border-radius: 0.300rem;
    cursor: pointer;

    &:hover{ 
        background-color: #161616;
        color: #bcbcbc
    }
`

export const CardContent = styled.div `
    display: flex;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    text-align: center;
    overflow: hidden;
   
    #img-content { 
        height: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: #141313;
    }

    #info-content { 
        text-align: start;
        padding: 1rem;
        align-content: center;
    }

    & img { 
        width: 90px;
        margin-bottom: 1rem;
    }

    
`