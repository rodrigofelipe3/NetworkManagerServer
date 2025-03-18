import styled from "styled-components";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"
import { CgEthernet } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa";
import { RiRestartFill } from "react-icons/ri";
import { IoMdReturnLeft } from "react-icons/io";
import { LuScreenShare } from "react-icons/lu";
import { GrHostMaintenance } from "react-icons/gr";

export const SidebarBody = styled(Sidebar)`
    height: 100dvh;

    .css-dip3t8{
        background-color: #1e2126;
        border-radius: 0 0 50px 0;
    }
    
    .css-um1o6k{ 
        display: none;
    }

    .ps-menu-button{ 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .css-16jesut >.ps-menu-button:hover{ 
        background-color: #25292d;
    }

    .css-16jesut{ 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .css-wx7wi4 { 
        margin-right: 0;
    }
    
    .css-1t8x7v1 >.ps-menu-button:hover{ 
        background-color: #1e2126;
    }

    
    .css-16jesut{ 
        display: block;
    }

`
export const MenuSidebar = styled(Menu)`
    
`

export const SubMenuSidebar = styled(SubMenu)`
    background-color: #25292d;
    color: #fff;
    &:hover { 
        background-color: #1e2126;
    }
    .css-jn69v9{ 
        
        margin-left: 10px;
    }
    .ps-menuitem-root>a:hover{ 
        background-color: #1e2126;
    }
`

export const MenuItemSidebar = styled(MenuItem)`
    background-color: #25292d;
    color: #fff;

    &:hover{ 
        background-color: #1e2126;
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

export const IconReturn = styled(IoMdReturnLeft)`
    padding-right: 0.5rem;
    font-size: 1rem;
    color: #fff;
`

export const IconScreen = styled(LuScreenShare)`
    padding-right: 0.5rem;
    font-size: 1rem;
    color: #fff;
`

export const IconMaintenance = styled(GrHostMaintenance)`
    padding-right: 0.5rem;
    font-size: 1rem;
    color: #fff;

`

export const ModalUserInput = styled.input `
    padding: 15px;
    border: solid #000 1px;
    border-radius: 5px;
    font-size: 1.3rem;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;
`
