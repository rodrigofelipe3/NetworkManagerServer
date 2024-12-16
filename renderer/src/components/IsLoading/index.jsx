import React from "react";
import {CircleLoader} from "react-spinner"
import { LoadingContainer } from "./style";

export const LoadingComponent = () => {
    return (
        <>
            <LoadingContainer>
               <CircleLoader/>
            </LoadingContainer>

        </>
    )
}