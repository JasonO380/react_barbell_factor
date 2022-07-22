import React, { useState, useEffect } from "react";
import DashboardOutput from "./dashboard-output";
import DashboardForm from "./dashboard-form";
import { motion } from 'framer-motion/dist/framer-motion';
import GetMacros from "./get-macros";
import { NavLink } from "react-router-dom";

import "./dashboard.css";


const Dashboard = () => {
    const [macros, setMacros] = useState([]);
    const addMacros = (newMacros) => {
        setMacros((prevMacros)=> {
            return [...prevMacros, newMacros]
        });
    };

    return(
        <React.Fragment>
            <motion.div
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                <div className="macro_header_box">
                    <h2>MACRO TRACKER</h2>
                </div>
                <DashboardOutput
                items2={macros}
                items={macros} />
                <DashboardForm items={macros} onAdd={addMacros} />
            </motion.div>
        </React.Fragment>
    )
};

export default Dashboard;


