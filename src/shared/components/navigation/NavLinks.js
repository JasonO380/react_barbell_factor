import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";


const NavLinks = (props) => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/dashboard">DASHBOARD</NavLink>
            </li>
            <li>
                <NavLink to="/the-big-board">TheBOARD</NavLink>
            </li>
            <li>
                <NavLink to="/coach-platform">LOGIN</NavLink>
            </li>
            <li>
                <NavLink to="/signup-login">REGISTER</NavLink>
            </li>
        
        </ul>
    )
};

export default NavLinks;