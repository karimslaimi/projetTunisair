import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from 'Components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
    return (
        <Suspense fallback={<Loading cover="content"/>}>
            <Routes>
                <Route path={`${APP_PREFIX_PATH}/dashboards`} component={lazy(() => import(`./dashboard`))} />
                <Navigate from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/dashboards`} />
            </Routes>
        </Suspense>
    )
}

export default React.memo(AppViews);
