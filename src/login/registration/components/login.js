import React , { useState } from "react";
import { motion } from 'framer-motion/dist/framer-motion';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password:""
    });

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        console.log(inputValue);
        console.log(inputName);
        setLoginInfo(prevValue => {
            return {
                ...prevValue,
                [inputName]:inputValue
            }
        })
        console.log(loginInfo);
    }

    const loginUser = (event) => {
        event.preventDefault();
        console.log("logged in");
        console.log(loginInfo);
    }
    return (
        <motion.div 
        className="center"
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            <h2>Login to our account</h2>
            <form className="login_register_form">
                <h4>Email</h4>
                <input
                name="email"
                value={loginInfo.email}
                placeholder="enter email"
                onChange={changeHandler} />
                <h4>Password</h4>
                <input
                name="password"
                value={loginInfo.password}
                placeholder="enter password"
                onChange={changeHandler} />
                <div className="login_register_form_enter_button_box">
                <button 
                className="form_button"
                onClick={loginUser}>LOGIN</button>
                </div>
                <div className="login_register_form_switch_mode_box">
                </div>
            </form>
        </motion.div>
    )
};

export default Login;