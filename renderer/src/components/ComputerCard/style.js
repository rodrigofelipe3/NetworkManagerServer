import styled from "styled-components";


export const CardBody = styled.div `
    
    height: 9rem;
    //display: flex;
    margin: 0.500rem;
    background-color: #eaeaea;
    /*justify-content: center;
    align-items: center;*/
    border-radius: 0.300rem;
    cursor: pointer;

    &:hover{ 
        background-color: #c2c2c2;
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
        background-color: #020202;
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