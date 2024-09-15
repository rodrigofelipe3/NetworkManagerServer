import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Homepage/HomePage";


export const Router = () => { 
    return (
        <>
            <Routes>
                <Route exact path="*" element={<HomePage/>}/>
                <Route exact path="/" element={<HomePage/>}/>
            </Routes>
        </>
    )
}