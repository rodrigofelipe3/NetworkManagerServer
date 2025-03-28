import styled from "styled-components";
import CountUp from 'react-countup';
import { FaEllipsisVertical } from "react-icons/fa6";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const consolebg = require("../../../assets/imagens/network-console.png")


export const GridContent = styled.div`
    width: 87%;
    margin: 0 auto;
    padding-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    
`

export const HeaderContent = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    padding: 2rem;

`

export const Console = styled.div`
    width: 15rem;
    height: 7rem;
    display: flex;
    cursor: pointer;
    text-align: center;
    flex-wrap: wrap;
    background-color: #0056c6;
    background-image: url(${consolebg});
    background-position-x: 11rem;
    background-size: 10rem;
    background-repeat: no-repeat;
    border-radius: 1.5rem;
    padding: 2rem;

    h3 { 

        width: 100%;
        color: #fff;
    }

  
`

export const CountUpp = styled(CountUp)`
    color: #fff;
    margin: 0 auto;
    font-size: 4rem;
    text-align: center;
    font-weight: 700;
`

export const VerticalIcon = styled(FaEllipsisVertical)`
    
    margin-left: 1rem;
    padding: 1rem;
    border-radius: 2rem;
    color: #fff;
    background-color: #242424;
    &:hover { 
        color: #fff;
        background-color: #0056C6;
    }
`

export const DepartmentDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    color: #fff;

    h2 { 
        margin-left: 8%;
        margin-bottom: 1%;
    }
`
export const ArrowRightIcon = styled(KeyboardDoubleArrowRightIcon)`
    width: 3rem;
    color: #fff;
    transition: transform 0.3s ease-in-out; // Animação suave
    transform: rotate(${(props) => (props.rotate ? "90deg" : "0deg")});
    cursor: pointer;
`