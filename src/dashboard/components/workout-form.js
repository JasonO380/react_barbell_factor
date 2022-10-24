import React, { useState, useReducer, useContext } from "react";
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";
import { useNavigate } from "react-router-dom";
import WorkoutEditMode from "./workout-edit-mode";

import "./workout-form.css";

let id;
const inputReducer = (state, action) => {
    const dateEntry = new Date();
    switch (action.type){
        case 'INPUT_CHANGE':
            return {
                ...state,
                [action.name]: action.value,
                athlete:id,
                // athlete:id,
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
    const auth = useContext(LoginRegisterContext);
    const [switchToEditMode, setSwitchToEditMode] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    const[isValid, setIsValid] = useState(true);
    const navigate = useNavigate();
    const [inputState, dispatch] = useReducer(inputReducer, {
        movement:"",
        reps:"",
        rounds:"",
        weight:"",
        athlete:auth.userID
    });
    // console.log(auth);

    const changeHandler = (event)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
        dispatch({
            type:'INPUT_CHANGE',
            name: inputName,
            value: inputValue
        })
    };

    const editMode = () =>{
        setSwitchToEditMode(true);
        console.log(switchToEditMode);
        // navigate('/workouteditmode')
    }

    const postWorkoutData = async (event) => {
        id = auth.userID;
        console.log(auth.userID);
        // console.log(auth.userID);
        event.preventDefault();
        // console.log(inputState);
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
        // else {
        //     props.workoutFormItems(inputState);
        // }
        try {
            const response = await fetch('https://barbell-factor.herokuapp.com/api/workouts', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Issuer ' + auth.token
            },
            body: JSON.stringify({
                movement: inputState.movement,
                rounds: inputState.rounds,
                reps:inputState.reps,
                weight:inputState.weight,
                dayOfWeek: inputState.dayOfWeek,
                month:inputState.month,
                day:inputState.day,
                year:inputState.year,
                athlete:id
            })
        });
        const responseData = await response.json();
        console.log(responseData.session);
        props.workoutFormItems(responseData.session);
        } catch (err){};
        dispatch({
            type:'CLEAR_FORM'
        });
        setFormIsValid(true);
        
        event.preventDefault();
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
                className="workout_input"
                name="movement"
                value={inputState.movement}
                label="Movement"
                placeholder="Enter movement"
                onChange={changeHandler} />
            </div>
                <div className="movement_description_box">
                    <h4>Rounds:</h4>
                    <input
                    className="workout_input"
                    name="rounds"
                    value={inputState.rounds}
                    label="Rounds"
                    placeholder="Enter rounds"
                    onChange={changeHandler} />
                    <h4>Reps:</h4>
                    <input
                    className="workout_input"
                    name="reps"
                    value={inputState.reps}
                    label="Reps"
                    placeholder="Enter reps"
                    onChange={changeHandler} />
                    <h4>Weight:</h4>
                    <input
                    className="workout_input"
                    name="weight"
                    value={inputState.weight}
                    label="Weight"
                    placeholder="Enter weight"
                    onChange={changeHandler} />
            </div>
            <div className="button_container_enter_workouts">
                <button
                value={inputState.id} 
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
