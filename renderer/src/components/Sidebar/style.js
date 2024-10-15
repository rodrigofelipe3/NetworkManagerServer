import styled from "styled-components";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar"
import { CgEthernet } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa";
import { RiRestartFill } from "react-icons/ri";
import { IoMdReturnLeft } from "react-icons/io";
import { LuScreenShare } from "react-icons/lu";
import { GrHostMaintenance } from "react-icons/gr";

export const SidebarBody = styled(Sidebar)`
    .css-dip3t8{
        background-color: #1e2126;
    }
    
    height: 100%;   
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

`
export const MenuSidebar = styled(Menu)`
    a:hover{
        background-color: aqua;
     }
`

export const MenuItemSidebar = styled(MenuItem)`
    background-color: #25292d;
    color: #fff;
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