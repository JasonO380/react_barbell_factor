import React, { useState } from "react";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { Link, } from "react-router-dom";
import UpdateMacros from "./update-macros";
import { v4 as uuidv4 } from 'uuid';

import "./macros-form.css"

const MacrosForm = (props) => {
    const [isValid, setIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [macroData, setMacroData] = useState({
        id:"",
        year:"",
        month:"",
        day:"",
        carbs:"",
        protein:"",
        fats:""
    });


    const changeHandler = (event) => {
        const macro = event.target.value;
        const macroName = event.target.name;
        const uid = uuidv4();
        const dayOfMonth = Math.floor((Math.random() * 15) +1 );
        const macroDateEntry = new Date();

        setMacroData(preValue => {
            return {
                ...preValue,
                [macroName]: macro,
                id:uid,
                year: macroDateEntry.getFullYear(),
                month: macroDateEntry.toLocaleString("en-US", { month:"long" }),
                day:macroDateEntry.getDate(),
            }
        });
    };

    const postMacroData = (event) => {
        console.log(macroData);
        if(macroData.carbs.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } 
        if (macroData.carbs.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            console.log(isValid);
            return null;
        } 
        if (macroData.protein.length === 0){
                setIsValid(false);
                setFormIsValid(false);
                return null;
            }
        if (macroData.fats.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } else {
            props.onAdd(macroData);
        }
        setMacroData({
            carbs:"",
            fats:"",
            protein:""
        });
        setFormIsValid(true);
        event.preventDefault();
        
    };

    return (
        <div className="form_container">
        <div className="diet_form">
            <div className="diet_form_header_box">
            <h2>Enter your macros</h2>
            </div>
                <form className="form_box">
                <div className="form_inputs">
                    <h4>Carbs</h4>
                    <input
                    className="macro_input"
                    required
                    size="large"
                    id={macroData.day}
                    name="carbs"
                    label="Carbs"
                    value={macroData.carbs}
                    errorText="Please enter your carb intake in grams"
                    placeholder="Grams of crabs"
                    onChange={changeHandler} />
                </div>
                <div className="form_inputs">
                    <h4>Protein</h4>
                    <input
                    className="macro_input"
                    required
                    id={macroData.day}
                    name="protein"
                    label="Protein"
                    value={macroData.protein}
                    errorText="Please enter your protein intake in grams"
                    placeholder="Grams of protein"
                    onChange={changeHandler} />
                </div>
                <div className="form_inputs">
                    <h4>Fats</h4>
                    <input
                    className="macro_input"
                    required
                    id={macroData.day}
                    name="fats"
                    label="Fats"
                    value={macroData.fats}
                    errorText="Please enter your fat intake in grams"
                    placeholder="Grams of fat"
                    onChange={changeHandler} />
                </div>
                    <button
                    className="form_button" 
                    onClick={postMacroData}
                    in={props.in}>Click me</button>
                </form>
                {!isValid ? <div style={{display: formIsValid && "none"}} className="error_message"><p className="form_error_message">Please enter all fields</p></div> : null}
        </div>
    </div>
    );
};

export default MacrosForm;

