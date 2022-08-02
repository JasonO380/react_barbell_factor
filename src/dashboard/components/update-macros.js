import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import macroData from "./macro-items";
import { motion } from 'framer-motion/dist/framer-motion';
import "./update-macros.css";


const UpdateMacros = (props) => {
    const macroID = props.items.map(macro=> macro.id);
    const foundMacros = props.items.map(macros => macros);
    // for when node.js is hooked up
    // const macroID= useParams().mid;
    // const foundMacros = macroData.find(macro => macro.id === macroID);
    // const macrosToUpdate = foundMacros.filter(macros => macros.id === macroID);
    
    const[macrosToUpdate, setMacrosToUpdate] = useState();
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [updateData, setUpdateData] = useState({
        id:"",
        day:"",
        carbs:"",
        protein:"",
        fats:""
    });

    useEffect(()=>{
        const getMacrosToUpdate = () =>{
            const updateMacros = [];
            foundMacros.map(macros => {
                const selectedMacrosID = macros.id
                console.log(selectedMacrosID);
                if(selectedMacrosID === macroID){
                    console.log("here");
                    updateMacros.push(macros);
                }
            });
        };
        getMacrosToUpdate();
    },[foundMacros])

    const changeHandler = (event) => {
        const macro = event.target.value;
        const macroName = event.target.name;
        const uid = uuidv4();
        setUpdateData(preValue => {
            return {
                ...preValue,
                [macroName]: macro,
                id:preValue.id,
                day:preValue.day
            }
        });
    };

    const postUpdateMacroData = (event) => {
        console.log(updateData);
        if(updateData.carbs.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } 
        if (updateData.carbs.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            console.log(isValid);
            return null;
        } 
        if (updateData.protein.length === 0){
                setIsValid(false);
                setFormIsValid(false);
                return null;
            }
        if (updateData.fats.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } 

        setUpdateData({
            carbs:"",
            fats:"",
            protein:""
        });
        setFormIsValid(true);
        event.preventDefault();
        navigate('/dashboard');
    };

    if(!foundMacros){
        return <h2>NO MACROS YET START ENTERING DATA</h2>
    }


    return (
        <React.Fragment>
        <motion.div
            className="update_container"
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
                <h2 className="update_header">Update Macros for {props.items.map(macros => macros.month)} {props.items.map(macros => macros.day)} </h2>
            <form class="update_form_container">
                <div className="form_inputs">
                        <h4>Carbs</h4>
                        <input
                        className="macro_inputs"
                        required
                        id="carbs"
                        element="input"
                        type="text"
                        name="carbs"
                        label="Carbs"
                        errorText="Please enter your carb intake in grams"
                        placeholder={props.items.map(macros => macros.carbs)}
                        onChange={changeHandler} />
                    </div>
                    <div className="form_inputs">
                        <h4>Protein</h4>
                        <input
                        className="macro_inputs"
                        required
                        id="protein"
                        element="input"
                        type="text"
                        name="protein"
                        label="Protein"
                        errorText="Please enter your protein intake in grams"
                        placeholder={props.items.map(macros => macros.protein)}
                        onChange={changeHandler} />
                    </div>
                    <div className="form_inputs">
                        <h4>Fats</h4>
                        <input
                        className="macro_inputs"
                        required
                        id="fats"
                        element="input"
                        type="text"
                        name="fats"
                        label="Fats"
                        errorText="Please enter your fat intake in grams"
                        placeholder={props.items.map(macros => macros.fats)}
                        onChange={changeHandler} />
                    </div>
                        <button
                        className="form_button" 
                        onClick={postUpdateMacroData}>Click me</button>
            </form>
        </motion.div>
        </React.Fragment>
    );
};

export default UpdateMacros;
