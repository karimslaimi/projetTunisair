import React from 'react'
import { Routes, Route, } from "react-router-dom";
import AuthViews from 'views/Auth-Views/Login';
import { useThemeSwitcher } from "react-css-theme-switcher";
import Loading from "../../Components/shared-components/Loading";

export const AuthLayout = ({ children }) => {
    const { status } = useThemeSwitcher();
    console.log("auth  layout");

    if (status === 'loading') {
        return <Loading cover="page" />;
    }

    return (
        <div className="auth-container">

                { children }
        </div>
    )
}


export default AuthLayout
