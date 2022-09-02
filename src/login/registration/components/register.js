import React, { useState, useEffect, useReducer, useContext } from "react";
import { motion } from 'framer-motion/dist/framer-motion';
import { LoginRegisterContext } from '../components/context/login-register-context';

import "./register.css";

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

const Register = () => {
    const loginRegister = useContext(LoginRegisterContext);
    const [inputState, dispatch] = useReducer(inputReducer, {
        username:"",
        email:"",
        password:""
    });

    const postUserData = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: inputState.username,
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
    };

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

    return (
        <motion.div 
        className="center"
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            <h2>Register your account</h2>
            <form className="login_register_form">
                <h4>Username</h4>
                <input
                name="username"
                value={inputState.username}
                placeholder="enter username"
                onChange={changeHandler} />
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
                className="form_button"
                onClick={postUserData}>REGISTER</button>
                </div>
            </form>
        </motion.div>
    )
};

export default Register;