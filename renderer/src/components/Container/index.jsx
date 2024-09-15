import React from "react";
import { Container } from "./style";

export const ContainerJSX = ({children}) => { 

    return (
        <>
            <Container>
                {children}
            </Container>
        </>
    )
}