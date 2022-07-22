import React from "react";
import footerInfo from "./footer-info";
import FooterCard from "./footer-card";

import "./footer.css";

const createFooter = (footerInfo) => {
    return(
        <FooterCard
        name={footerInfo.name}
        copyright={footerInfo.copyright}
        tech={footerInfo.tech} />
    )
};

const Footer = () => {
    return(
        <div className="center">
            {footerInfo.map(createFooter)}
        </div>
    )
};

export default Footer;