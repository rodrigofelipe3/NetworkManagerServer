import styled from "styled-components";

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