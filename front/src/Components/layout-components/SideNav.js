import React from "react";
import { Layout } from 'antd';
import { SIDE_NAV_WIDTH, NAV_TYPE_SIDE } from 'constants/ThemeConstant';
import { Scrollbars } from 'react-custom-scrollbars-2';
import MenuContent from './MenuContent'

const { Sider } = Layout;

export const SideNav = ({navCollapsed, sideNavTheme, routeInfo, hideGroupTitle, localization = true }) => {
  const props = { sideNavTheme, routeInfo , hideGroupTitle, localization}
  return (
    <Sider 
      className={`side-nav`}
      width={SIDE_NAV_WIDTH} 
      collapsed={navCollapsed}
    >
      <Scrollbars autoHide>
        <MenuContent 
          type={NAV_TYPE_SIDE} 
          {...props}
        />
      </Scrollbars>
    </Sider>
  )
}


export default SideNav;
