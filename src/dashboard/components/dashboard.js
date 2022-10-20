import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion/dist/framer-motion';
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

import "./dashboard.css";


const Dashboard = () => {
    return(
        <React.Fragment>
            <motion.div
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.5}}}> 
            <React.Fragment>
            <div className="heading">
            <header>
                <h1>DASHBOARD</h1>
            </header>
            </div>
            {/* <table className="dashboard_table">
                <thead>
                    <tr>
                        <td>Macro Logger</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Start tracking your carbs protein and fat intake</td>
                    </tr>
                    <tr>
                        <td>Make sure to enter all fields otherwise the form will not submit</td>
                    </tr>
                    <tr>
                        <td>After entering macro nutrient info the last two entries will be editable</td>
                    </tr>
                </tbody>
            </table> */}
            <div className="dashboard_container">
                <div className="dashboard_wrapper">
                <div>
                    <h4 className="dashboard_header">Macro Logger</h4>
                </div>
                <div>
                    <p>Track your carb, protein and fat intake in grams</p>
                    <p>Enter all fields or form will not submit</p>
                    <p>Edit available on the last two entries</p>
                </div>
                </div>
            
            <div className="dashboard_wrapper">
                <div>
                    <h4 className="dashboard_header">Workout Tracker</h4>
                </div>
                <div>
                    <p>Track your weightlifting exercises</p>
                    <p>Enter all fields or form will not submit</p>
                    <p>Edit available on all entries</p>
                </div>
            </div>
            <div className="dashboard_wrapper">
                <div>
                    <h4 className="dashboard_header">Workout assistant</h4>
                </div>
                <div>
                    <p>Programming and coaching available for</p>
                    <p>HIT training</p>
                    <p>Technique and analysis for weightlifting</p>
                    <p>General fitness and health</p>
                    <p>Contact for more info to set up a free consultation</p>
                    <a 
                    class="contact_icon"
                    href="mailto:JMOllada@gmail.com"><MdOutlineEmail /></a>
                    <a 
                    class="contact_icon"
                    href="https://www.instagram.com/jasono380"><FaInstagram /></a>
                </div>
            </div>
            </div>
            </React.Fragment>
            </motion.div>
        </React.Fragment>
    )
}

export default Dashboard;


