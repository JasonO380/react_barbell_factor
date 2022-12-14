import React, { useState, useContext, useReducer } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { LoginRegisterContext } from "./context/login-register-context";
import { useNavigate } from "react-router-dom";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            return {
                ...state,
                [action.name]: action.value,
            };
        default:
            return state;
    }
};

let accessGranted;

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(true);
    const [inputState, dispatch] = useReducer(inputReducer, {
        email: "",
        password: "",
    });
    const loginRegister = useContext(LoginRegisterContext);

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        console.log(inputValue);
        console.log(inputName);
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const loginUser = async (event) => {
        event.preventDefault();
        console.log("Clicked");
        try {
            const response = await fetch(
                "https://barbell-factor.onrender.com/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: inputState.email,
                        password: inputState.password,
                    }),
                }
            );
            const responseData = await response.json();
            accessGranted = responseData.message;
            console.log(responseData.message);
            loginRegister.login(responseData.userID, responseData.token);
            console.log(accessGranted)
        } catch (err) {
            console.log(err);
        }

        if (accessGranted !== "Success") {
            setLogin(false);
        } else {
            navigate("/dashboard");
        }
    };
    return (
        <motion.div
            className="center"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
        >
            <h2>Login to your account</h2>
            <form className="login_register_form" onSubmit={loginUser}>
                <h4>Email</h4>
                <input
                    className="login_register_input"
                    name="email"
                    value={inputState.email}
                    placeholder="enter email"
                    onChange={changeHandler}
                />
                <h4>Password</h4>
                <input
                    className="login_register_input"
                    name="password"
                    value={inputState.password}
                    placeholder="enter password"
                    onChange={changeHandler}
                />
                <div className="login_register_form_enter_button_box">
                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.8 }}
                        className="form_button"
                    >
                        LOGIN
                    </motion.button>
                </div>
            </form>
            {!login && (
                <div className="error_message">
                    <p className="form_error_message">{accessGranted}</p>
                </div>
            )}
        </motion.div>
    );
};

export default Login;
