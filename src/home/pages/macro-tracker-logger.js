import React, { useEffect, useState } from "react";
import MacroTrackerLoggerOutput from "../../dashboard/components/macro-tracker-logger-output";
import MacrosForm from "../../dashboard/components/macros-form";
import EditOutput from "../../dashboard/components/edit-mode-output";
import { motion } from 'framer-motion/dist/framer-motion';


const MacroTrackerLogger = () => {
    const [macros, setMacros] = useState([]);
    const [macrosToEdit, setMacrosToEdit] = useState([])
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const addMacros = (newMacros) => {
        setMacros((prevMacros)=> {
            return [...prevMacros, newMacros]
        });
    };
    const editMacros = (update) => {
        setMacrosToEdit((prevUpdate)=> {
            return [...prevUpdate, update]
        })
    }
    const [macrosEnteredForDay, setMacrosForDayEntered] = useState(false);

    useEffect(()=>{
        const checkMacrosForDayEntered = ()=>{
            if(macros.length){
                console.log(macrosEnteredForDay);
                setMacrosForDayEntered(true);
            } else {
                console.log(macros)
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
                <MacrosForm
                updateMode={isUpdateMode}
                onUpdate={editMacros}  
                onAdd={addMacros} />
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
                <MacroTrackerLoggerOutput
                items2={macros}
                items={macros} />
            </motion.div>
        </React.Fragment>
        )
    };
}

export default MacroTrackerLogger;