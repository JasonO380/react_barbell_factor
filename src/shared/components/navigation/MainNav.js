import React, { useContext } from "react";
import { LoginRegisterContext } from "../../../login/registration/components/context/login-register-context";
import DropdownMenu from "./menu-dropdown-button";
import Logo from "../../UIElements/Logo";
import MainHeader from "./MainHeader";
import RegisterLoginLinks from "./Register-Login-Links";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MainNav.css";

const MainNav = (props) => {
    const loginRegister = useContext(LoginRegisterContext);
    const navigate = useNavigate();
    const isLoggedIn = loginRegister.isLoggedIn;
    // console.log(loginRegister.userID);
    // console.log(loginRegister.isLoggedIn);
    const logoutUser = () => {
        loginRegister.logout();
        navigate('/');
    }
    return (
        <MainHeader>
            <Logo />
            {!isLoggedIn && (
                <div className="register_login_div">
                <RegisterLoginLinks />
                </div>
            )}
            {isLoggedIn &&
            <React.Fragment> 
            <DropdownMenu />
            <div className="logout_div" onClick={logoutUser}>
                <a>LOGOUT</a>
            </div>
            </React.Fragment>}
        </MainHeader>
    )
};

export default MainNav;