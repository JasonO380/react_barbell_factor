import React from "react";
import { FaReact } from "react-icons/fa";

import "./footer-card.css";

const FooterCard = (props) => {
    return(
        <div>
            <p className="footer_text_style">Site designed by {props.name}</p>
            <p className="footer_text_style">copyright {props.copyright}</p>
            <p className="footer_text_style">Site designed with {props.tech}</p>
            <p><FaReact /></p>
            
        </div>
    )
};

export default FooterCard;