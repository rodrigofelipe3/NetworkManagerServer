import styled from "styled-components";


export const GridContent = styled.div `
    width: 100%;
    margin: 0 auto;
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
    margin: 0 auto;

    #grid-display { 
        width: 100%;
        justify-content: space-around;
        display: grid;
        grid-template-columns: auto auto;
    }

    #systeminformation { 
        h1 { 
            padding: 1rem;
        }
    }

    #manager-buttons{ 
        display: flex;
        justify-content: space-around;
    }
`
export const StyledButton = styled.div `
    width: 5rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 0.800rem;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    background-color: #c2c2c2;
    border-radius: 2rem;
    color: white;
    cursor: pointer;

    &:hover { 
        background-color: #bcbcbc;
    }

`