import React, { useState } from "react";

import "./update-workouts.css";

const UpdateWorkouts = (props) => {

    const[updateInfo, setUpdateInfo] = useState({
        movement:"",
        rounds:"",
        reps:"",
        weight:""
    })
    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setUpdateInfo(prevValue => {
            return {
                ...prevValue,
                [inputName]:inputValue,
            }
        })
    };

    const postUpdate = (event) => {
        event.preventDefault();
        // props.onUpdate(updateInfo);
        console.log(updateInfo);
        setUpdateInfo({
            movement:"",
            rounds:"",
            reps:"",
            weight:""
        })
    };

    return (
        <form className="all_workouts_session_container_form">
        <div className="movement_data">
                    <div className="movement_header_box">
                        <h4>Movement:</h4>
                        <textarea
                        name="movement"
                        label="Movement"
                        placeholder={props.workoutitems.movement}
                        onChange={handleChange} />
                    </div>
                        <div className="movement_description_box">
                            <h4>Rounds:</h4>
                            <input
                            name="rounds"
                            label="Rounds"
                            placeholder={props.workoutitems.rounds}
                            onChange={handleChange} />
                            <h4>Reps:</h4>
                            <input
                            name="reps"
                            label="Reps"
                            placeholder={props.workoutitems.reps}
                            onChange={handleChange} />
                            <h4>Weight:</h4>
                            <input
                            name="weight"
                            label="Weight"
                            placeholder={props.workoutitems.weight}
                            onChange={handleChange} />
                    </div>
                    <div className="button_container_update_workouts">
                        <button 
                        className="form_button"
                        onClick={postUpdate}>Update</button>
                    </div>
        </div>
        </form>
        
    );
};

export default UpdateWorkouts;
