import React from "react";
import {Route, Routes, Navigate, Outlet} from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import AuthLayout from 'layouts/AuthLayout';
import Login from "./Auth-Views/Login";

const PrivateRoutes = () => {
    let auth = {'token': false}
    return (
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}
export const Views = (props) => {
    return (

        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path={"*"} element={<AppLayout/>}/>
            </Route>
            <Route path="/login" element={
                <AuthLayout>
                    <Login/>
                </AuthLayout>}/>
        </Routes>
    )
}
export default Views;
