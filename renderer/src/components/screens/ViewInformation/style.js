import styled from "styled-components";
import { CgEthernet } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa";
import { RiRestartFill } from "react-icons/ri";
export const InformationContent = styled.div `
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    h1 { 
        margin-top: 2rem;
        color: #fff;
    }
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
        width: 80%;
        justify-content: start;
        margin: 0 auto;
    }

    #back-button{ 
        margin-right: 1rem;
    }

    #wake-on-button{
        margin-left: 1rem;
    }
`

export const IconEthernet = styled(CgEthernet)`
    padding-right: 0.5rem;
    font-size: 1rem;
    color: #fff;
`

export const IconPower = styled(FaPowerOff)`
    padding-right: 0.5rem;
    font-size: 1rem;
    color: #fff;
`

export const IconRestart = styled(RiRestartFill)`
    padding-right: 0.5rem;
    font-size: 1rem;
    color: #fff;
`