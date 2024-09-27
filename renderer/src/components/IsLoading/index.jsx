import React from "react";
import {CircleLoader} from "react-spinner"
import { LoadingContainer } from "./style";

export const Loading = () => {
    return (
        <>
            <LoadingContainer>
                <CircleLoader></CircleLoader>
            </LoadingContainer>

        </>
    )
}