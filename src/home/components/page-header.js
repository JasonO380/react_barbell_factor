import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";
import "./page-header.css";

const PageHeader = () => {
    return (
        <React.Fragment>
            <div className="contact_info_box">
                <a class="contact_icon" href="mailto:JMOllada@gmail.com">
                    <MdOutlineEmail />
                </a>
                <a
                    class="contact_icon"
                    href="https://www.instagram.com/jasono380"
                >
                    <FaInstagram />
                </a>
                <NavLink to="/dashboard">
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        className="form_button"
                    >
                        Dashboard
                    </motion.button>
                </NavLink>
            </div>
            <div className="center">
                <h3 className="page_header_title">
                    GET LEAN, STRONG AND MOBILE
                </h3>
            </div>
        </React.Fragment>
    );
};

export default PageHeader;
