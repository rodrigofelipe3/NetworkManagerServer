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
        display: grid;
        grid-template-columns: auto auto;
    }

    #DisplayGrid { 
        width: 100%;
        display: grid;
        grid-template-columns: auto auto;
    }
    #systemInformation { 
        padding: 5%;
        margin-left: 15%;
        h1 { 
            padding: 1rem;
        }
    }
    
    #ManagerTask { 
        margin-top: 5%;
        margin-right: 3%;
        margin-left: 2%;
    }

    #back-button{ 
        margin-right: 1rem;
    }

    #wake-on-button{
        margin-left: 1rem;
    }
    margin-bottom: 1rem;
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