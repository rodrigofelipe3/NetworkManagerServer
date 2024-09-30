import React, { useState } from "react";
import { Header, IconSearch, IconSettings, Li, Nav, SearchInput, Ul } from "./style";
const logo = require("../../assets/imagens/logo.png");

export const CompHeader = ({ InputValue, setInputValue }) => {
    const [isVisible, setIsVisible] = useState(false); 

    const handleOnChange = (event) => {
        setInputValue(event.target.value);
    };

    const toggleSearchInput = () => {
        setIsVisible(prevState => !prevState); 
    };

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
                                <div id="settings">
                                    <IconSettings />
                                </div>
                            </div>
                        </Li>
                    </Ul>
                </Nav>
            </Header>
        </>
    );
};
