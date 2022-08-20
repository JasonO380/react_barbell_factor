import React, { useState } from "react";
import { motion } from 'framer-motion/dist/framer-motion';

import "./register.css";

const Register = () => {
    // const [loginMode, setIsLogginMode] = useState(false);
    const [registerInfo, setRegisterInfo] = useState ({
        username:"",
        email:"",
        password:""
    })

    // const loginModeHandler = () => {
    //     setIsLogginMode(false);
    //     if (!loginMode){
    //         setIsLogginMode(true);
    //     }
    // }; 

    const postUserData = (event) => {
        event.preventDefault();
        setRegisterInfo({
            username:"",
            email:"",
            password:""
        })
    };

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        console.log(inputValue);
        console.log(inputName);
        setRegisterInfo(prevValue => {
            return {
                ...prevValue,
                [inputName]:inputValue
            }
        })
        console.log(registerInfo);
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
                value={registerInfo.username}
                placeholder="enter username"
                onChange={changeHandler} />
                <h4>Email</h4>
                <input
                name="email"
                value={registerInfo.email}
                placeholder="enter email"
                onChange={changeHandler} />
                <h4>Password</h4>
                <input
                name="password"
                value={registerInfo.password}
                placeholder="enter password"
                onChange={changeHandler} />
                <div className="login_register_form_enter_button_box">
                <button 
                className="form_button"
                onClick={postUserData}>REGISTER</button>
                </div>
                {/* <div className="login_register_form_switch_mode_box">
                <button 
                className="form_button"
                onClick={loginModeHandler}>SWITCH TO LOGIN</button>
                </div> */}
            </form>
        </motion.div>
    )
};

export default Register;