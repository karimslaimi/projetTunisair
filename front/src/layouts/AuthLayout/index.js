import React from 'react'
import { useThemeSwitcher } from "react-css-theme-switcher";
import Loading from "../../Components/shared-components/Loading";

export const AuthLayout = ({ children }) => {
    const { status } = useThemeSwitcher();


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
