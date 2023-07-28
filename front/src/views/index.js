import React from "react";
import {Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import AuthLayout from 'layouts/AuthLayout';
import AppLocale from "lang";
import {IntlProvider} from "react-intl";
import {ConfigProvider} from 'antd';
import {APP_PREFIX_PATH, AUTH_PREFIX_PATH} from 'configs/AppConfig'

function RouteInterceptor({children, isAuthenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Navigate
                        to={{
                            pathname: AUTH_PREFIX_PATH,
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

export const Views = (props) => {
    const {locale, token, location, direction} = props;
    const currentAppLocale = AppLocale[locale];
    return (
        <IntlProvider locale={locale}>
            <ConfigProvider locale={locale.antd} direction={direction}>
                <BrowserRouter>
                    <Routes>

                        <Route path="/" exact>
                            <Navigate to={APP_PREFIX_PATH}/>
                        </Route>

                        <AuthLayout>
                            <Route path={"/login"}></Route>
                        </AuthLayout>


                    <Route path={APP_PREFIX_PATH} isAuthenticated={token}>
                        <AppLayout direction={direction}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
</IntlProvider>
)
}


export default Views;
