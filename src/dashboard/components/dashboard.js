import React, { useState, useEffect } from "react";
import DashboardOutput from "./dashboard-output";
import MacrosForm from "./macros-form";
import UpdateMacros from "./update-macros";
import { motion } from 'framer-motion/dist/framer-motion';

import "./dashboard.css";


const Dashboard = () => {
    const [macros, setMacros] = useState([]);
    const addMacros = (newMacros) => {
        setMacros((prevMacros)=> {
            return [...prevMacros, newMacros]
        });
    };
    const [macrosEnteredForDay, setMacrosForDayEntered] = useState(false);

    useEffect(()=>{
        const checkMacrosForDayEntered = ()=>{
            if(macros.length > 0){
                console.log(true);
                setMacrosForDayEntered(true);
            } else {
                console.log(false)
            }
        }
        checkMacrosForDayEntered();
    },[macros])

    if(!macrosEnteredForDay){
        return(
            <React.Fragment>
            <motion.div
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                <div className="macro_header_box">
                    <h2>MACRO TRACKER</h2>
                </div>
                <MacrosForm items={macros} onAdd={addMacros} />
            </motion.div>
        </React.Fragment>
        )
    };

    if(macrosEnteredForDay){
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
            </motion.div>
        </React.Fragment>
        )
    };
}

export default Dashboard;


