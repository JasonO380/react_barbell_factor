import React from "react";
import { Link } from "react-router-dom";


import Logo from "../../UIElements/Logo";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNav.css";

const MainNav = (props) => {
    return (
        <MainHeader>
    
        <button className="main-navigation__menu-btn" >
            <span />
            <span />
            <span />
        </button>
        
        <Logo />
        
        <nav className="main-navigation__header-nav">
            <NavLinks />
        </nav>
    </MainHeader>
    )
};

export default MainNav;