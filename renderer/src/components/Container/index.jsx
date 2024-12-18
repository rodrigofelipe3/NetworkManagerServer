import React, { useEffect, useRef, useState} from "react";
import { Container } from "./style";

export const ContainerJSX = ({children}) => { 
    const sizeContainer = useRef(null)
    const [size, setSize] = useState({width: 0, height: 0})

    useEffect(()=> { 
        if (sizeContainer.current) {
            const { offsetWidth, offsetHeight } = sizeContainer.current;
            setSize({ width: offsetWidth, height: offsetHeight });
          }
    }, [ ])
    return (
        <>
            <Container ref={sizeContainer}>
                {children}
            </Container>
        </>
    )
}