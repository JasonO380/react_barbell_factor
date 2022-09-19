import React from "react";
import { ReactDOM } from "react";
import UpdateWorkouts from "./update-workouts";

const updateDeleteModal = (props) => {
    return ReactDOM.createPortal(<UpdateWorkouts workoutitems={updateWorkout} />, document.getElementById('update-delete-overaly'))
}

export default updateDeleteModal;