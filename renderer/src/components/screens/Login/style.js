import {styled} from "styled-components"
import { IoClose } from "react-icons/io5";


export const ContainerLogin = styled.div `
        position: fixed;
        display: flex;
        align-items: center;
        width: 50%;
        height: 100vh;
        max-width: 600px;
        background: #fff;
        box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.3); 
        top: 0;
        left: 0;
        z-index: 10;
        transition: 0.3s ease;
        
        @media(max-width: 768px){
            max-width: 100vw;
            width: 100vw;
            transition: 0.1s ease;
        }

        & #rememberme{ 
            margin-top: 1rem;
        }
`

export const ContentForm = styled.div `
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 8%;
    width: 100%;
    
   
    & a { 
        
        font-weight: 600;
        text-decoration: none;
        color:#0543ff;
        text-align: center;
    }

    & a:hover { 
        color: #0543ff;
    }
`

export const LoginForm = styled.form `
    display: inline-block;
    width: 100%;
    padding-bottom: 10%;
    border-radius: 0.625rem;
    background: #fff;
    & form { 
            width: 100%;
            display: flex;
            justify-content: center;
        }
  
`



export const LoginButton = styled.button `
    display: inline-block;
    width: 34%;
    background-color: ${props=> props.isDisabled? "#a39999" : "#255AE8" };
    font-weight: 600;
    color: ${props=> props.isDisabled? "#d8d8d8" : "#fff" };
    font-size: 1em;
    padding: 1rem;
    border: none;
    box-shadow: 1px 1px 5px #000;
    border-radius: 2rem;
    cursor: pointer;
    &:hover { 
        color: ${props=> props.isDisabled? "#d8d8d8" : "#fff" };
        background-color: ${props=> props.isDisabled? "#6b6b6b" : "#433BEB" };
    }

    &#valid-button { 
        background-color: ${props=> props.isDisabled? "#a39999" : "#31b738" } ;

        &:hover { 
            background-color: ${props=> props.isDisabled? "#6b6b6b" : "#07822c" } ;
        }
    }

    &#invalid-button { 
        background-color: ${props=> props.isDisabled? "#a39999" : "#b72121" } ;

        &:hover { 
            background-color: ${props=> props.isDisabled? "#6b6b6b" : "#820707" } ;
    }
    }
`

export const SignButton = styled.button `
    display: inline-block;
    cursor: pointer;
    width: 10rem;
    background-color: #433BEB;
    color: #fff;
    font-size: 1em;
    margin-left: 5%;
    padding: 1rem;
    border: none;
    box-shadow: 1px 1px 5px #000;
    border-radius: 2rem;

    &:hover { 
        color: #fff;
        background-color: #255AE8;
    }

    & a{ 
        text-decoration: none;
        font-weight: 600;
        color: #fff;
    }
`

export const CloseButton = styled.div`
    width: 3rem;
    height: 3rem;
    background-color: transparent;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 1rem;
    right: 1rem;
    &:hover{ 
        background-color: #000;
    }
`

export const CloseIconButton = styled(IoClose)`
    width: 2rem;
    height: 2rem;
    color: #fff;
`