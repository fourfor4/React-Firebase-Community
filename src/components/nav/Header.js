import React, { useState } from "react";
import { Menu, Switch } from "antd";
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { logOut } from "../../actions/userActions";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const [theme, setTheme] = useState("dark")
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  // Logout
  const logout = () => {
    firebase.auth().signOut();
    dispatch(logOut())
    history.push("/login")
  }

  // set theme
  const handlethemeChange = (value) => {
    value ? setTheme('dark') : setTheme('light')
  }

  return (
    <Menu theme={theme} onClick={handleClick} selectedKeys={[current]} mode="horizontal">


      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Welcome to levelshealth.com!</Link>
      </Item>

      {!user &&
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      }


      {!user &&

        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      }

      {user &&
        <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className="float-right">
          <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
        </SubMenu>
      }

      <span className="float-right mr-3">
        <Switch
          checked={theme === 'dark'}
          onChange={handlethemeChange}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        /></span>
    </Menu>
  );
};

export default Header;
