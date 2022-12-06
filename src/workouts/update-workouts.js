import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
} from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { LoginRegisterContext } from "../login/registration/components/context/login-register-context";

import "./update-workouts.css"

const inputReducer = (state, action) => {
    const dateEntry = new Date();
    switch (action.type) {
        case "INPUT_CHANGE":
            return {
                ...state,
                [action.name]: action.value,
                athlete: "",
                year: dateEntry.getFullYear(),
                dayOfWeek: dateEntry.toLocaleString("default", {
                    weekday: "long",
                }),
                month: dateEntry.toLocaleString("en-US", { month: "long" }),
                day: dateEntry.getDate(),
            };
        case "CLEAR_FORM":
            return {
                movement: "",
                reps: "",
                rounds: "",
                weight: "",
            };
        default:
            return state;
    }
};

const UpdateWorkouts = (props) => {
    const [formIsValid, setFormIsValid] = useState(true);
    const [showModal, setShowModal] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const auth = useContext(LoginRegisterContext);
    const update = [props.workoutitems];
    console.log(update);
    if (update.length < 1) {
        props.allWorkoutsDeleted(true);
    }
    const wid = [props.workoutitems.map((workouts) => workouts._id)];
    const refPoint = useRef(null);
    const [inputState, dispatch] = useReducer(inputReducer, {
        movement: "",
        reps: "",
        rounds: "",
        weight: "",
    });
    console.log(wid);
    console.log(refPoint);
    console.log("here in update workouts");

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideDiv);
    }, [wid]);

    const handleClickOutsideDiv = (event) => {
        console.log(event.target);
        console.log(refPoint);
        const updateDiv = refPoint.current;
        console.log(updateDiv);
        if (updateDiv && updateDiv.contains(event.target)) {
            setShowModal(true);
            console.log("Clicked inside");
        } else {
            console.log("clicked outside");
            setShowModal(false);
        }
        return () => {
            document.removeEventListener("click", handleClickOutsideDiv);
        };
    };

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const postUpdate = async (event) => {
        event.preventDefault();
        if (!inputState.movement) {
            setIsValid(false);
            setFormIsValid(false);
            return null;
        }
        if (!inputState.reps) {
            setIsValid(false);
            setFormIsValid(false);
            return null;
        }
        if (!inputState.rounds) {
            setIsValid(false);
            setFormIsValid(false);
            return null;
        }
        if (!inputState) {
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } else {
            props.isUpdateMode(false);
            props.showUpdate(true);
        }
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/workouts/${wid}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        movement: inputState.movement,
                        rounds: inputState.rounds,
                        reps: inputState.reps,
                        weight: inputState.weight,
                    }),
                }
            );
            const responseData = await response.json();
            console.log(responseData);
        } catch (err) {}
        props.isUpdateMode(false);
        props.fetch();
    };

    const deleteWorkout = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `https://barbell-factor.onrender.com/api/workouts/${wid}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Issuer " + auth.token,
                    },
                }
            );
        } catch (err) {}
        props.isUpdateMode(false);
        props.fetch();
    };

    return (
        <form
            ref={refPoint}
            style={{ display: !showModal && "none" }}
            className="update_delete_session_container"
        >
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "fit-content" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
                className="movement_data"
            >
                <div className="movement_header_box">
                    <h4>Movement:</h4>
                    <textarea
                        name="movement"
                        label="Movement"
                        placeholder={props.workoutitems.map((w) => w.movement)}
                        onChange={handleChange}
                    />
                </div>
                <div className="movement_description_box">
                    <h4>Rounds:</h4>
                    <input
                        name="rounds"
                        label="Rounds"
                        placeholder={props.workoutitems.map((w) => w.rounds)}
                        onChange={handleChange}
                    />
                    <h4>Reps:</h4>
                    <input
                        name="reps"
                        label="Reps"
                        placeholder={props.workoutitems.map((w) => w.reps)}
                        onChange={handleChange}
                    />
                    <h4>Weight:</h4>
                    <input
                        name="weight"
                        label="Weight"
                        placeholder={props.workoutitems.map((w) => w.weight)}
                        onChange={handleChange}
                    />
                </div>
                <div className="button_container_update_workouts">
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        className="form_button"
                        onClick={postUpdate}
                    >
                        Update
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={deleteWorkout}
                        className="form_button"
                    >
                        Delete
                    </motion.button>
                </div>
            </motion.div>
            {!isValid ? (
                <div
                    style={{ display: formIsValid && "none" }}
                    className="error_message"
                >
                    <p className="form_error_message">
                        Please enter all fields
                    </p>
                </div>
            ) : null}
        </form>
    );
};

export default UpdateWorkouts;
