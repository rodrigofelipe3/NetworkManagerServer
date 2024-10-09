import styled from "styled-components";


export const CardBody = styled.div `
    color: #d6d6d6;
    margin: 0.500rem;
    background-color: #242424;
    border-radius: 0.900rem;
    cursor: pointer;

    &:hover{ 
        background-color: #202020;
        color: #fff;
    }

    #verticaloptions{ 
        position: absolute;
        display: flex;
        justify-content: start;
        width: 100%;
       
    }
`

export const CardContent = styled.div `
    
    display: grid;
    height: 100%;
    grid-template-columns: auto auto;
    text-align: center;
    overflow: hidden;
   
    #img-content { 
        height: 90%;
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