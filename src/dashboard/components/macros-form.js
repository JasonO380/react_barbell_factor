import React, { useState, useReducer, useContext } from "react";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
import { v4 as uuidv4 } from 'uuid';

import "./macros-form.css";

const inputReducer = (state, action) => {
    const uid = uuidv4();
    const macroDateEntry = new Date();
    switch (action.type){
        case 'INPUT_CHANGE':
            return {
                ...state,
                [action.name]: action.value,
                id:uid,
                year:macroDateEntry.getFullYear(),
                dayOfWeek: macroDateEntry.toLocaleString("default", { weekday: "long" }),
                month:macroDateEntry.toLocaleString("en-US", { month:"long" }),
                day:macroDateEntry.getDate(),
                };
                case 'CLEAR_FORM':
                    return {
                        movement:'',
                        reps:'',
                        rounds:'',
                        weight:''
                    }
                default: return state
            };
    };

const MacrosForm = (props) => {
    const auth = useContext(LoginRegisterContext);
    const [isValid, setIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [inputState, dispatch] = useReducer(inputReducer, {
        id:"",
        year:"",
        month:"",
        day:"",
        carbs:"",
        protein:"",
        fats:"",
    });

    const changeHandler = (event) => {
        const macroValue = event.target.value;
        const macroName = event.target.name;
        dispatch({
            type:'INPUT_CHANGE',
            name: macroName,
            value: macroValue
        })
    };

    const postMacroData = async (event) => {
        event.preventDefault();
        console.log(inputState);
        if(inputState.carbs.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } 
        if (inputState.carbs.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            console.log(isValid);
            return null;
        } 
        if (inputState.protein.length === 0){
                setIsValid(false);
                setFormIsValid(false);
                return null;
            }
        if (inputState.fats.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } else {
            console.log(inputState);
            props.onAdd(inputState);
        }
        try {
            const response = await fetch('http://localhost:5000/api/macros', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Issuer ' + auth.token
            },
            body: JSON.stringify({
                carbs:inputState.carbs,
                protein: inputState.carbs,
                fats:inputState.fats,
                athlete:auth.userID
            })
        });
        const responseData = await response.json();
        console.log(responseData);
        } catch (err){};
        dispatch({
            type:'CLEAR_FORM'
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
                    id={inputState.day}
                    name="carbs"
                    label="Carbs"
                    value={inputState.carbs}
                    errorText="Please enter your carb intake in grams"
                    placeholder="Grams of crabs"
                    onChange={changeHandler} />
                </div>
                <div className="form_inputs">
                    <h4>Protein</h4>
                    <input
                    className="macro_input"
                    required
                    id={inputState.day}
                    name="protein"
                    label="Protein"
                    value={inputState.protein}
                    errorText="Please enter your protein intake in grams"
                    placeholder="Grams of protein"
                    onChange={changeHandler} />
                </div>
                <div className="form_inputs">
                    <h4>Fats</h4>
                    <input
                    className="macro_input"
                    required
                    id={inputState.day}
                    name="fats"
                    label="Fats"
                    value={inputState.fats}
                    errorText="Please enter your fat intake in grams"
                    placeholder="Grams of fat"
                    onChange={changeHandler} />
                </div>
                    <button
                    className="form_button" 
                    onClick={postMacroData}
                    in={props.in}>Enter</button>
                </form>
                {!isValid ? <div style={{display: formIsValid && "none"}} className="error_message"><p className="form_error_message">Please enter all fields</p></div> : null}
        </div>
    </div>
    );
};

export default MacrosForm;

