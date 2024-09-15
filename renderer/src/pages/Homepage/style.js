import styled from "styled-components";


export const GridContent = styled.div `
    width: 100%;
    height: 100vh;
    margin-left: 1rem;
    margin-right: 1rem;
    display: grid;
    justify-content: center;
    grid-template-columns: auto auto auto auto;
    
`

export const HeaderContent = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 2rem;
`

export const InformationContent = styled.div `
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 5%;
    margin-right: 5%;
    #button-div { 
        width: 100%;
        height: 3rem;
    }
`

export const StyledButton = styled.div `
    width: 5rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 0.800rem;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    background-color: #c2c2c2;
    border-radius: 1rem;
    color: white;
    cursor: pointer;

    &:hover { 
        background-color: #bcbcbc;
    }

`