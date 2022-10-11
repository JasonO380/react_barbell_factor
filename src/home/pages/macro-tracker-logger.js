import React, { useEffect, useState, useContext } from "react";
import MacrosForm from "../../dashboard/components/macros-form";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
import EditOutput from "../../dashboard/components/edit-mode-output";
import { motion } from 'framer-motion/dist/framer-motion';

let userID;
let editArray = [];

const MacroTrackerLogger = () => {
    const [macrosEnteredForDay, setMacrosForDayEntered] = useState(false);
    const auth = useContext(LoginRegisterContext);
    userID = auth.userID;
    console.log(userID);
    const [macros, setMacros] = useState([]);
    const [macrosToEdit, setMacrosToEdit] = useState([])
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    
    const addMacros = (newMacros) => {
        setMacros((prevMacros)=> {
            return [...prevMacros, newMacros]
        });
    };
    const editMacros = (isCurrentDay) => {
        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.toLocaleString("en-US", { month:"long" });
        const currentYear = date.getFullYear();
        console.log(macrosEnteredForDay)
        console.log(isCurrentDay.map(m => m.day === currentDay && m.month === currentMonth))
    }

    const fetchMacros = async () => {
        let editOptions = [];
        try {
            const response = await fetch(`http://localhost:5000/api/macros/macroslog/${userID}`);
            const responseData = await response.json();
            const macros = responseData.macros;
            const date = new Date();
            const currentDay = date.getDate();
            const currentMonth = date.toLocaleString("en-US", { month:"long" });
            const currentYear = date.getFullYear();
            console.log(macros.map(m => m.day === currentDay))
            editOptions = macros.slice(-2);
            console.log(editOptions)
            editArray = editOptions;
            console.log(editArray)
            editMacros(editArray)
            macros.map(m => {
                if(m.day === currentDay && m.month === currentMonth){
                    console.log('here in map')
                    setMacrosForDayEntered(true);
                    console.log(macrosEnteredForDay)
            }})
            setMacrosToEdit(editOptions);
            console.log(editArray);
        } catch (err){}
    }

    useEffect(()=> {
        fetchMacros();
    },[userID]);

    if(macrosEnteredForDay){
        return(
            <motion.div
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                <div className="macro_header_box">
                    <h2>EDIT MODE</h2>
                </div>
                <EditOutput
                updateData={editArray} />
            </motion.div>
        )
    }

    return (
        <React.Fragment>
            <motion.div
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                <div className="macro_header_box">
                    <h2>MACRO TRACKER</h2>
                </div>
                <MacrosForm
                fetch={fetchMacros}
                updateMode={isUpdateMode}
                onUpdate={editMacros}  
                onAdd={addMacros} />
            </motion.div>
        </React.Fragment>
    )
}

export default MacroTrackerLogger;