import React from "react";
import barbellfactor from "../../barbellfactor.jpeg";
import { NavLink } from "react-router-dom";

import "./Logo.css";



const Logo = (props) => {
    return (
        <div className="logo" >
            <NavLink className="logo" to="/">
                <img 
                src={barbellfactor}
                style={{ width:props.width }} />
            </NavLink>
        </div>
        
    );
};

export default Logo;