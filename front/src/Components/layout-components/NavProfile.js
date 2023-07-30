import React from "react";
import {Menu, Dropdown, Avatar} from "antd";
import {connect, useDispatch, useSelector} from 'react-redux'
import {
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import Icon from 'Components/Util-Components/Icon';
import authService from "../../Services/AuthService";
import {logOut} from "Redux/Slices/AuthSlice";
import {useNavigate} from "react-router-dom";

const menuItem = [
    {
        title: "Edit Profile",
        icon: EditOutlined,
        path: "/"
    }
]




export const NavProfile = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const signOut = () => {

        authService.logOut();
        dispatch(logOut());
        navigate('/login');

    }
    const user = useSelector((state) => state.userData.user);
    const name = user.userName;
    const profileImg = "/img/avatars/thumb-1.jpg";
    const profileMenu = (
        <div className="nav-profile nav-dropdown">
            <div className="nav-profile-header">
                <div className="d-flex">
                    <Avatar size={45} src={profileImg}/>
                    <div className="pl-3">
                        <h4 className="mb-0">{name}</h4>
                        <span className="text-muted">{user.role}</span>
                    </div>
                </div>
            </div>
            <div className="nav-profile-body">
                <Menu>
                    {menuItem.map((el, i) => {
                        return (
                            <Menu.Item key={i}>
                                <a href={el.path}>
                                    <Icon className="mr-3" type={el.icon}/>
                                    <span className="font-weight-normal">{el.title}</span>
                                </a>
                            </Menu.Item>
                        );
                    })}
                    <Menu.Item key={menuItem.length + 1} onClick={e => signOut()}>
            <span>
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Sign Out</span>
            </span>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
    return (
        <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
            <Menu className="d-flex align-item-center" mode="horizontal">
                <Menu.Item key="profile">
                    <Avatar src={profileImg}/>
                </Menu.Item>
            </Menu>
        </Dropdown>
    );
}

export default connect(null)(NavProfile)
