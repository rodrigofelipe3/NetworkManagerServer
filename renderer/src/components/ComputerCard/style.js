import styled from "styled-components";


export const CardBody = styled.div `
    width: 12rem;
    height: 12rem;
    display: flex;
    margin: 0.500rem;
    background-color: #eaeaea;
    justify-content: center;
    align-items: center;
    border-radius: 0.300rem;
    cursor: pointer;

    &:hover{ 
        background-color: #c2c2c2;
    }
`

export const CardContent = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    text-align: center;
   
    & img { 
        width: 90px;
        margin-bottom: 1rem;
    }

    
`