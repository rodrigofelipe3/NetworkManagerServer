import React, { useState } from "react";
import { Header, IconSearch, IconSettings, IconUpdate, Li, Nav, SearchInput, Ul } from "./style";
import { FloatButton } from "../FloatMenu";
const logo = require("../../assets/imagens/logo.png");

export const CompHeader = ({ InputValue, setInputValue, recharge}) => {
    const [isVisible, setIsVisible] = useState(false); 

    const handleOnChange = (event) => {
        setInputValue(event.target.value);
    };

    const toggleSearchInput = () => {
        setIsVisible(prevState => !prevState); 
    };
    let bool = true
    return (
        <>
            <Header>
                <Nav>
                    <Ul>
                        <Li>
                            <img src={logo} alt="logo" />
                        </Li>
                        <Li>
                            <div id="icon-content">
                               
                                <SearchInput
                                    type="text"
                                    name="value"
                                    placeholder="Digite o nome do Host"
                                    value={InputValue}
                                    onChange={handleOnChange}
                                    isVisible={isVisible} 
                                />
                              
                                <div id="search" onClick={toggleSearchInput}>
                                    <IconSearch />
                                </div>
                                <div id="update" onClick={()=> recharge(!bool)}>
                                    <IconUpdate />
                                </div>
                                <div id="settings">
                                    <FloatButton taskkill={false} settings={true}><IconSettings /></FloatButton> 
                                </div>
                            </div>
                        </Li>
                    </Ul>
                </Nav>
            </Header>
        </>
    );
};
