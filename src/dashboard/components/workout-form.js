import React, { useState, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

import "./workout-form.css";

const inputReducer = (state, action) => {
    const uid = uuidv4();
    const dateEntry = new Date();
    switch (action.type){
        case 'INPUT_CHANGE':
            return {
                ...state,
                [action.name]: action.value,
                id:uid,
                year:dateEntry.getFullYear(),
                dayOfWeek: dateEntry.toLocaleString("default", { weekday: "long" }),
                month:dateEntry.toLocaleString("en-US", { month:"long" }),
                day:dateEntry.getDate(),
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

const WorkoutForm = (props)=>{
    const [formIsValid, setFormIsValid] = useState(true);
    const[isValid, setIsValid] = useState(true);
    const [inputState, dispatch] = useReducer(inputReducer, {
        id:"",
        year:"",
        month:"",
        day:"",
        carbs:"",
        protein:"",
        fats:"",
    });

    const changeHandler = (event)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
        dispatch({
            type:'INPUT_CHANGE',
            name: inputName,
            value: inputValue
        })
    };

    const postWorkoutData = (event) => {
        event.preventDefault();
        console.log(inputState);
        if(!inputState.movement){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } 
        if (!inputState.reps){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } 
        if (!inputState.rounds){
                setIsValid(false);
                setFormIsValid(false);
                return null;
            }
        if (!inputState){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        }
        else {
            props.workoutFormItems(inputState);
        }
        dispatch({
            type:'CLEAR_FORM'
        });
        setFormIsValid(true);
        event.preventDefault();
        console.log(inputState);
    };

    return(
        <React.Fragment>
            <div className="workout_form_header_box">
                    <h2>Enter your workout</h2>
            </div>
            <form className="all_workouts_session_container_form">
            <div className="movement_data">
            <div className="movement_header_box">
                <h4>Movement:</h4>
                <textarea
                name="movement"
                value={inputState.movement}
                label="Movement"
                placeholder="Enter movement"
                onChange={changeHandler} />
            </div>
                <div className="movement_description_box">
                    <h4>Rounds:</h4>
                    <input
                    name="rounds"
                    value={inputState.rounds}
                    label="Rounds"
                    placeholder="Enter rounds"
                    onChange={changeHandler} />
                    <h4>Reps:</h4>
                    <input
                    name="reps"
                    value={inputState.reps}
                    label="Reps"
                    placeholder="Enter reps"
                    onChange={changeHandler} />
                    <h4>Weight:</h4>
                    <input
                    name="weight"
                    value={inputState.weight}
                    label="Weight"
                    placeholder="Enter weight"
                    onChange={changeHandler} />
            </div>
            <div className="button_container_enter_workouts">
                <button 
                className="form_button"
                onClick={postWorkoutData}>Enter</button>
            </div>
            </div>
            </form>
            {!isValid ? <div style={{display: formIsValid && "none"}} className="error_message"><p className="form_error_message">Please enter all fields</p></div> : null}
        </React.Fragment>
    )
};

export default WorkoutForm;
