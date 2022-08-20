import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";


const NavLinks = (props) => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/register">REGISTER</NavLink>
            </li>
            <li>
                <NavLink to="/login">LOGIN</NavLink>
            </li>
        </ul>
    )
};

export default NavLinks;