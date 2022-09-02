import React from "react";
import { NavLink } from "react-router-dom";


import "./Register-Login-Links.css";

const RegisterLoginLinks = () =>{
    return(
        <div className="nav_links">
            <NavLink to="/login">LOGIN</NavLink>
            <NavLink to ="/register">REGISTER</NavLink>
        </div>
    )
};

export default RegisterLoginLinks;