import React, { useState, useEffect } from "react";
import DashboardOutput from "./dashboard-output";
import MacrosForm from "./macros-form";
import UpdateMacros from "./update-macros";
import { motion } from 'framer-motion/dist/framer-motion';

import "./dashboard.css";


const Dashboard = () => {
    return(
        <React.Fragment>
            <motion.div
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            <React.Fragment>
            <div className="heading">
            <header>
                <h1>DASHBOARD</h1>
            </header>
            </div>
            <div className="page_info_services">
                <div>
                    <p>Area for Macro logger info</p>
                </div>
                <div>
                    <p>Area for Workout logger info</p>
                </div>
                <div>
                    <p>Area for to promote coaching help</p>
                </div>
            </div>
            </React.Fragment>
            </motion.div>
        </React.Fragment>
    )
}

export default Dashboard;


