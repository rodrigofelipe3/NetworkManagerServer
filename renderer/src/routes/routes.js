import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Homepage/HomePage";
import { PromptPage } from "../pages/PromptPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { ProtectedRoutes } from "./protectedroutes";

export const Router = () => {
  return (
    <>
      <Routes>
          <Route exact path="*" element={<LoginPage />} />
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/home"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route
            exact
            path="/prompt/:ip"
            element={
                <PromptPage />
            }
          />
      </Routes>
    </>
  );
};
