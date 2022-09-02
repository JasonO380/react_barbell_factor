import React , { useState, useContext, useReducer, useCallback, useEffect } from "react";
import { motion } from 'framer-motion/dist/framer-motion';
import { LoginRegisterContext } from "./context/login-register-context";

const inputReducer = (state, action) => {
    switch (action.type){
        case 'INPUT_CHANGE':
            return {
                ...state,
                [action.name]: action.value,
                };
                default: return state
            };
    };

const Login = () => {
    const [inputState, dispatch] = useReducer(inputReducer, {
            email:"",
            password:""
        });
    const loginRegister = useContext(LoginRegisterContext);
    
    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        console.log(inputValue);
        console.log(inputName);
        dispatch({
            type:'INPUT_CHANGE',
            name: inputName,
            value: inputValue
        })
    }

    const loginUser = async (event) => {
        event.preventDefault();
        console.log('Clicked');
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: inputState.email,
                password: inputState.password
            })
        });
        const responseData = await response.json();
        console.log(responseData);
        } catch (err){
            console.log(err)
        }
        loginRegister.login();
    } 
    return (
        <motion.div 
        className="center"
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            <h2>Login to our account</h2>
            <form className="login_register_form" onSubmit={loginUser}>
                <h4>Email</h4>
                <input
                name="email"
                value={inputState.email}
                placeholder="enter email"
                onChange={changeHandler} />
                <h4>Password</h4>
                <input
                name="password"
                value={inputState.password}
                placeholder="enter password"
                onChange={changeHandler} />
                <div className="login_register_form_enter_button_box">
                <button 
                type="submit"
                className="form_button"
                >LOGIN</button>
                </div>
                <div className="login_register_form_switch_mode_box">
                </div>
            </form>
        </motion.div>
    )
};

export default Login;