import React from "react";
import { Link } from "react-router-dom";

import DropdownMenu from "./menu-dropdown-button";
import Logo from "../../UIElements/Logo";
import MainHeader from "./MainHeader";
import RegisterLoginLinks from "./Register-Login-Links";
import NavLinks from "./NavLinks";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MainNav.css";

const MainNav = (props) => {
    return (
        <MainHeader>
            <Logo />
            <div className="register_login_div">
            <RegisterLoginLinks />
            {/* <NavLinks /> */}
            {/* <button 
            className="register_login_form_button"
            href="/register"
            >REGISTER</button>
            <button 
            className="register_login_form_button"
            href="/login"
            >LOGIN</button> */}
            </div>
            <DropdownMenu />
        </MainHeader>

    //     <MainHeader>
    //         <button className="main-navigation__menu-btn" >
    //             <span />
    //             <span />
    //             <span />
    //         </button>
    //         <Logo />
    //         <nav className="main-navigation__header-nav">
    //             <NavLinks />
    //         </nav>
    // </MainHeader>
    )
};

export default MainNav;