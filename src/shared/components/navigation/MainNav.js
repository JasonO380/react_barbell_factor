import React, { useContext } from "react";
import { LoginRegisterContext } from "../../../login/registration/components/context/login-register-context";
import DropdownMenu from "./menu-dropdown-button";
import Logo from "../../UIElements/Logo";
import MainHeader from "./MainHeader";
import RegisterLoginLinks from "./Register-Login-Links";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MainNav.css";

const MainNav = (props) => {
    const loginRegister = useContext(LoginRegisterContext);
    return (
        <MainHeader>
            <Logo />
            <div className="register_login_div">
            <RegisterLoginLinks />
            </div>
            {loginRegister && (
            <DropdownMenu />)}
        </MainHeader>
    )
};

export default MainNav;