import React, { useEffect, useState, useContext } from "react";
import MacroTrackerLoggerOutput from "../../dashboard/components/macro-tracker-logger-output";
import MacrosForm from "../../dashboard/components/macros-form";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
import EditOutput from "../../dashboard/components/edit-mode-output";
import { motion } from 'framer-motion/dist/framer-motion';

let userID;
let editArray = [];

const MacroTrackerLogger = () => {
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
    const editMacros = (update) => {
        setMacrosToEdit((prevUpdate)=> {
            return [...prevUpdate, update]
        })
    }
    const [macrosEnteredForDay, setMacrosForDayEntered] = useState(false);

    useEffect(()=> {
        const fetchMacros = async () => {
            let editOptions = [];
            console.log('here')
            // const userID = auth.userID;
            // console.log(userID)
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
                macros.map(m => {
                    if(m.day === currentDay && m.month === currentMonth){
                        console.log('here in map')
                        setMacrosForDayEntered(true);
                        console.log(macrosEnteredForDay)
                }})
                setMacrosToEdit(editOptions);
                console.log(editOptions.map(m => m.month));
                console.log(editArray);
                console.log(macrosToEdit);
            } catch (err){}
        }
        fetchMacros();
    },[userID]);

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
    },[])

    if(macrosEnteredForDay){
        return(
            <motion.div
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                <div className="macro_header_box">
                    <h2>UPDATE TODAYS MACRO INFO</h2>
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
                updateMode={isUpdateMode}
                onUpdate={editMacros}  
                onAdd={addMacros} />
                <EditOutput
                updateData={editArray} />
            </motion.div>
        </React.Fragment>
    )

    // if(!macrosEnteredForDay){
    //     return(
    //         <React.Fragment>
    //         <motion.div
    //         initial={{width: 0}}
    //         animate={{width: "100%"}}
    //         exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
    //             <div className="macro_header_box">
    //                 <h2>MACRO TRACKER</h2>
    //             </div>
    //             <MacrosForm
    //             updateMode={isUpdateMode}
    //             onUpdate={editMacros}  
    //             onAdd={addMacros} />
    //         </motion.div>
    //     </React.Fragment>
    //     )
    // };

    // if(macrosEnteredForDay){
    //     return(
    //         <React.Fragment>
    //         <motion.div
    //         initial={{width: 0}}
    //         animate={{width: "100%"}}
    //         exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
    //             <div className="macro_header_box">
    //                 <h2>MACRO TRACKER</h2>
    //             </div>
    //             <MacroTrackerLoggerOutput
    //             items2={macros}
    //             items={macros} />
    //         </motion.div>
    //     </React.Fragment>
    //     )
    // };
}

export default MacroTrackerLogger;