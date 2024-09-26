import React from "react";
import { TailSpin } from "react-loader-spinner"
import { LoadingContainer } from "./style";
export const Loading = () => {
    return (
        <>
            <LoadingContainer>
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </LoadingContainer>

        </>
    )
}