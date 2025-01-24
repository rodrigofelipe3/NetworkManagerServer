import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/Homepage/HomePage";
import { PromptPage } from "../pages/PromptPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { ProtectedRoutes } from "./protectedroutes";
import { Fragment } from "react";

export const Router = () => {
  return (
    <>
      <Routes>
        <Fragment>
          <Route exact path="*" element={<Navigate to={'/login'}></Navigate>} />
          <Route exact path="/" element={<Navigate to={'/login'}></Navigate>} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/home/"
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
              <ProtectedRoutes>
                <PromptPage />
              </ProtectedRoutes>
            }
          />
        </Fragment>
      </Routes>
    </>
  );
};
