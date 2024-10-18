import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Homepage/HomePage";
import { PromptPage } from "../pages/PromptPage";


export const Router = () => { 
    return (
        <>
            <Routes>
                <Route exact path="*" element={<HomePage/>}/>
                <Route exact path="/" element={<HomePage/>}/>
                <Route exact path="/prompt" element={<PromptPage/>}/>
            </Routes>
        </>
    )
}