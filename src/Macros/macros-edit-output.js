import React, { useState, useReducer, useContext } from "react";
import { LoginRegisterContext } from "../login/registration/components/context/login-register-context";
import { useNavigate } from "react-router-dom";
import MacrosEdit from "./macro-edit";
import DoughnutChart from "../shared/UIElements/DoughnutChart";
import { motion } from "framer-motion/dist/framer-motion";

import "./macros-edit-output.css";

let mid;
const inputReducer = (state, action) => {
    const dateEntry = new Date();
    const auth = useContext(LoginRegisterContext);
    switch (action.type) {
        case "INPUT_CHANGE":
            return {
                ...state,
                [action.name]: action.value,
                id: mid,
                athlete: auth.userID,
                year: dateEntry.getFullYear(),
                dayOfWeek: dateEntry.toLocaleString("default", {
                    weekday: "long",
                }),
                month: dateEntry.toLocaleString("en-US", { month: "long" }),
                day: dateEntry.getDate(),
            };
        case "CLEAR_FORM":
            return {
                carbs: "",
                protein: "",
                fats: "",
            };
        default:
            return state;
    }
};

const MacrosEditOutput = (props) => {
    const navigate = useNavigate();
    const auth = useContext(LoginRegisterContext);
    const [updateComplete, setUpdateComplete] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [inputState, dispatch] = useReducer(inputReducer, {
        carbs: "",
        protein: "",
        fats: "",
        athlete: auth.userID,
    });
    const test = props.updateData;
    console.log(test);

    const changeHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        mid = event.target.id;
        dispatch({
            type: "INPUT_CHANGE",
            name: name,
            value: value,
        });
    };

    const postUpdateMacroData = async (event) => {
        event.preventDefault();
        if (inputState.carbs.length === 0) {
            setIsValid(false);
            setFormIsValid(false);
            return null;
        }
        if (inputState.protein.length === 0) {
            setIsValid(false);
            setFormIsValid(false);
            return null;
        }
        if (inputState.fats.length === 0) {
            setIsValid(false);
            setFormIsValid(false);
            return null;
        }
        setFormIsValid(true);
        try {
            const response = await fetch(
                `https://barbell-factor.herokuapp.com/api/macros/${mid}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth.token,
                    },
                    body: JSON.stringify({
                        carbs: inputState.carbs,
                        fats: inputState.fats,
                        protein: inputState.protein,
                    }),
                }
            );
            const responseData = await response.json();
            console.log(responseData);
        } catch (err) {}
        setUpdateComplete(true);
    };

    if (updateComplete) {
        return <MacrosEdit />;
    }

    return (
        <React.Fragment>
            {props.updateData.map((macros) => {
                return (
                    <motion.div
                        className="update_container"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        exit={{
                            x: window.innerWidth,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <DoughnutChart items2={macros} />
                        <form className="update_form_container">
                            <div className="form_inputs">
                                <h4>Carbs</h4>
                                <input
                                    className="macro_inputs"
                                    required
                                    id={macros.id}
                                    element="input"
                                    type="text"
                                    name="carbs"
                                    label="Carbs"
                                    errorText="Please enter your carb intake in grams"
                                    placeholder={macros.carbs}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="form_inputs">
                                <h4>Protein</h4>
                                <input
                                    className="macro_inputs"
                                    required
                                    id={macros.id}
                                    element="input"
                                    type="text"
                                    name="protein"
                                    label="Protein"
                                    errorText="Please enter your protein intake in grams"
                                    placeholder={macros.protein}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="form_inputs">
                                <h4>Fats</h4>
                                <input
                                    className="macro_inputs"
                                    required
                                    id={macros.id}
                                    element="input"
                                    type="text"
                                    name="fats"
                                    label="Fats"
                                    errorText="Please enter your fat intake in grams"
                                    placeholder={macros.fats}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="update_macros_button_container">
                                <motion.button
                                    className="form_button"
                                    whileTap={{ scale: 0.8 }}
                                    onClick={postUpdateMacroData}
                                >
                                    Update
                                </motion.button>
                            </div>
                        </form>
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
                    </motion.div>
                );
            })}
        </React.Fragment>
    );
};

export default MacrosEditOutput;
