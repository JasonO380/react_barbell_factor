import React from "react";
import { Link } from "react-router-dom";

import DropdownMenu from "./menu-dropdown-button";
import Logo from "../../UIElements/Logo";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MainNav.css";

const MainNav = (props) => {
    return (
        <MainHeader>
            <Logo />
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