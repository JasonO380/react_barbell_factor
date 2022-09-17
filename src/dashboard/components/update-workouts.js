import React, { useState, useEffect, useReducer, useContext } from "react";
import { motion } from 'framer-motion/dist/framer-motion';
import { LoginRegisterContext } from "../../login/registration/components/context/login-register-context";

import "./update-workouts.css";

const inputReducer = (state, action) => {
    const dateEntry = new Date();
    switch (action.type){
        case 'INPUT_CHANGE':
            return {
                ...state,
                [action.name]: action.value,
                athlete:'',
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

const UpdateWorkouts = (props) => {
    const auth = useContext(LoginRegisterContext);
    const update = props.workoutitems.map(workouts => workouts);
    const wid = props.workoutitems.map(workouts => workouts.id);
    console.log(wid);
    const [inputState, dispatch] = useReducer(inputReducer, {
        movement:"",
        reps:"",
        rounds:"",
        weight:""
    });
    
    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        dispatch({
            type:'INPUT_CHANGE',
            name: inputName,
            value: inputValue
        })
    };

    const postUpdate = async (event) => {
        event.preventDefault();
        props.isUpdateMode(false);
        props.showUpdate(true);
        try {
            const response = await fetch(`http://localhost:5000/api/workouts/${wid}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Issuer ' + auth.token
            },
            body: JSON.stringify({
                movement: inputState.movement,
                rounds: inputState.rounds,
                reps:inputState.reps,
                weight:inputState.weight
            })
        });
        const responseData = await response.json();
        console.log(responseData);
        } catch (err){};
        props.fetch();
    };

    const deleteWorkout = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/workouts/${wid}`,
            {
            method:'DELETE',
            headers:{
                Authorization: 'Issuer ' + auth.token
            }
        })
        props.setIsUpdateMode(false);
        } catch (err){}
    }

    return (
        //all_workouts_session_container_form
        <form className="update_delete_session_container">
        <motion.div
        initial={{width: 0}}
        animate={{width: "fit-content"}}
        exit={{x: window.innerWidth, transition: {duration: 0.2}}} 
        className="movement_data">
                    <div className="movement_header_box">
                        <h4>Movement:</h4>
                        <textarea
                        name="movement"
                        label="Movement"
                        placeholder={props.workoutitems.map(w => w.movement)}
                        onChange={handleChange} />
                    </div>
                        <div className="movement_description_box">
                            <h4>Rounds:</h4>
                            <input
                            name="rounds"
                            label="Rounds"
                            placeholder={props.workoutitems.map(w => w.rounds)}
                            onChange={handleChange} />
                            <h4>Reps:</h4>
                            <input
                            name="reps"
                            label="Reps"
                            placeholder={props.workoutitems.map(w => w.reps)}
                            onChange={handleChange} />
                            <h4>Weight:</h4>
                            <input
                            name="weight"
                            label="Weight"
                            placeholder={props.workoutitems.map(w => w.weight)}
                            onChange={handleChange} />
                    </div>
                    <div className="button_container_update_workouts">
                        <button 
                        className="form_button"
                        onClick={postUpdate}>Update</button>
                        <button
                        onClick={deleteWorkout} 
                        className="form_button" >Delete</button>
                    </div>
        </motion.div>
        </form>
    );
};

export default UpdateWorkouts;
