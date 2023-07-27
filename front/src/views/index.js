import React from "react";
import {Route, Routes, Link, Navigate} from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from '../layouts/AuthLayout';
import AppLocale from "../lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from 'antd';

const APP_PREFIX_PATH = '/app';
const AUTH_PREFIX_PATH = '/auth';

function RouteInterceptor({ children, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Link
                        to={{
                            pathname: AUTH_PREFIX_PATH,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export const Views = (props) => {
    const { locale, token, location, direction } = props;
    const currentAppLocale = AppLocale[locale];
    return (
        <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
                <Routes>
                    <Route exact path="/">
                        <Navigate to={APP_PREFIX_PATH} />
                    </Route>
                    <Route path={AUTH_PREFIX_PATH}>
                        <AuthLayout direction={direction} />
                    </Route>
                    <RouteInterceptor path={APP_PREFIX_PATH} isAuthenticated={token}>
                        <AppLayout direction={direction} location={location}/>
                    </RouteInterceptor>
                </Routes>
            </ConfigProvider>
        </IntlProvider>
    )
}
export default Views;