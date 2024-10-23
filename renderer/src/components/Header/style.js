import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";


export const Header = styled.header`
  width: 100%;
  background-color: #0056c6;
  display: flex;

`;

export const IconSearch = styled(IoSearchOutline)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const IconSettings = styled(IoSettings)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const IconUpdate = styled(GrUpdate)`
  width: 1.3rem;
  height: 1.5rem;
`;

export const Nav = styled.nav`
  width: 75%;
  margin: 0 auto;
`;
export const Ul = styled.ul`
  width: 100%;
  display: flex;
  text-decoration: none;
  list-style: none;
  text-align: center;
  justify-content: space-between;
`;
export const Li = styled.li`
  padding: 1rem;
  color: #fff;
  align-items: center;
  img {
    width: 50px;
  }

  #icon-content {
    position: stick;
    top: -18rem;
    right: 5rem;
    height: 100%;
    display: flex;
    align-items: center;

    #settings {
      cursor: pointer;
      display:flex;
      padding: 0.5rem;

      
    }
    #settings:hover {
        padding: 0.500rem;
        border-radius: 50%;
        background-color: #1b4891;
      }

    #search {
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 100%;
    }
    #search:hover {
        transition: ease 0.3s;
        padding: 0.5rem;
        border-radius: 100%;
        background-color: #1b4891;
    }

    #update {
      width: 1.5rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 100%;
    }
    #update:hover {
        background-color: #1b4891;
    }
  }
`;


export const SearchInput = styled.input`
    width: ${props => (props.isVisible ? "15rem" : "0")}; // Controle de largura
    height: 2rem;
    padding-left: 0.625rem;
    font-size: 1rem;
    background-color: transparent;
    color: #fff;
    border-radius: 1rem;
    border: solid 1.7px #fff;
    text-decoration: none;
    opacity: ${props => (props.isVisible ? "1" : "0")}; // Controle de opacidade
    transition: width 0.4s ease-in-out, opacity 0.3s ease-in-out; // Transição suave

    &::placeholder { 
        color: #3d94ff;
    }
    &:focus { 
        outline: none;
    }
`;