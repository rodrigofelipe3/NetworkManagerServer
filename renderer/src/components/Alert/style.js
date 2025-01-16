import { Alert } from "@mui/material";
import styled from "styled-components";

export const AlertContent = styled.div `
    width: 100%;
    display: flex;
    padding-top: 10px;
    justify-content: center;

`

export const AlertError = styled(Alert)`
    width: 500px;
`