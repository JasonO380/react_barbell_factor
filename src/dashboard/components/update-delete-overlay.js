import React from "react";
import ReactDOM  from "react-dom";
import UpdateWorkouts from "./update-workouts";

const UpdateDeleteModal = (props) => {
    return ReactDOM.createPortal(
<<<<<<< Updated upstream
    <UpdateWorkouts 
    workoutItems={props.workoutItems} />, document.getElementById('update-delete-overaly'))
=======
    <UpdateWorkouts
    isUpdateMode={props.isUpdateMode} 
    workoutItems={props.workoutItems} />, document.getElementById('update-delete-overlay'))
>>>>>>> Stashed changes
}

export default UpdateDeleteModal;


// const updateDeleteModal = (props) => {
//     return ReactDOM.createPortal(<UpdateWorkouts workoutitems={updateWorkout} />, document.getElementById('update-delete-overaly'))
// }