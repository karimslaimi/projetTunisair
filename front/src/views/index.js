import React from "react";
import {Route, Routes, Navigate, Outlet , useLocation} from "react-router-dom";
import {AppLayout} from "layouts/AppLayout";
import AuthLayout from 'layouts/AuthLayout';
import Login from "./Auth-Views/Login";
import {useSelector} from "react-redux";
import {APP_PREFIX_PATH, AUTH_PREFIX_PATH} from "../configs/AppConfig";
import {IntlProvider} from "react-intl";
import {ConfigProvider} from "antd";

const PrivateRoutes = () => {
    const auth = useSelector((state) => state.userData.user);
    return (
        auth?.token ? <Outlet/> : <Navigate to="/login"/>
    )
}





export const Views = (props) => {
    const { locale, token, location, direction } = props;
    const currentAppLocale = "fr";
    return (
        <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
                <Routes>
                    <Route exact path="/">
                        <Navigate to={APP_PREFIX_PATH} />
                    </Route>

                    <Route path="/login" element={
                        <AuthLayout>
                            <Login/>
                        </AuthLayout>}/>

                    <PrivateRoutes path={APP_PREFIX_PATH} isAuthenticated={token}>
                        <AppLayout direction={direction} location={location}/>
                    </PrivateRoutes>
                </Routes>
            </ConfigProvider>
        </IntlProvider>
    )
}
export default Views;
