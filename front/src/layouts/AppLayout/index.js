import React from 'react';
import { connect } from 'react-redux';


import {
    Layout,
    Grid,
} from "antd";

import navigationConfig from "configs/NavigationConfig";
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    NAV_TYPE_SIDE,
    NAV_TYPE_TOP,
    DIR_RTL,
    DIR_LTR
} from 'constants/ThemeConstant';
import { useThemeSwitcher } from "react-css-theme-switcher";
import Loading from "../../Components/shared-components/Loading";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const AppLayout = ({ navCollapsed, navType, location, direction }) => {

    const isNavSide = navType === NAV_TYPE_SIDE
    const isNavTop = navType === NAV_TYPE_TOP
    const getLayoutGutter = () => {

        return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
    }

    const { status } = useThemeSwitcher();

    if (status === 'loading') {
        return <Loading cover="page" />;
    }

    const getLayoutDirectionGutter = () => {
        if(direction === DIR_LTR) {
            return {paddingLeft: getLayoutGutter()}
        }
        if(direction === DIR_RTL) {
            return {paddingRight: getLayoutGutter()}
        }
        return {paddingLeft: getLayoutGutter()}
    }

    return (
<></>
    )
}

const mapStateToProps = ({ theme }) => {
    const { navCollapsed, navType, locale } =  theme;
    return { navCollapsed, navType, locale }
};

export default connect(mapStateToProps)(React.memo(AppLayout));
