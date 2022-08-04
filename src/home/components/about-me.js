import React, { useState } from "react";

import profilepic from "../../profilepic.jpeg";
import trainingInfo from "./training-profile-list";
import TrainingList from "./trainingProfileOutput";
import { MdArrowDropDownCircle } from "react-icons/md";
import barbellfactor from "../../barbellfactor.jpeg";



import "./aboutme.css";



const AboutMe = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const accordionToggle = () => {
        if(isOpen){
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };
    return (
        <React.Fragment>
        <div className="aboutme">
            <div className="profile_card" >
                <img className="profile_pic" src={profilepic} alt="Profile Pic" />
            </div>
            <div className="main_logo_box">
                <img className="main_logo" src={barbellfactor} />
            </div>
        </div>
            <div className="bio_container">
            <div className="bio_info">
                <header className="header">
                    <h3 onClick={accordionToggle} className="about_me_header">{props.title} <MdArrowDropDownCircle /> </h3>
                    
                </header>
                <ul className="list_frame" style={{
                        padding:!isOpen ? 0 : 15, 
                        margin:!isOpen ? 0 : 3,  
                        height: !isOpen ? 0 : "auto", 
                        opacity: !isOpen ? 0 : 1, 
                        transition: "all .2s ease-out" }}>
                {props.items.map(info => {
                    return(
                            <li 
                            style = {{
                                padding:!isOpen ? 0 : 15, 
                                margin:!isOpen ? 0 : 3,
                                height: !isOpen ? 0 : "auto", 
                                opacity: !isOpen ? 0 : 1, 
                                transition: "all .2s ease-out"
                                }}className="about_list_item">{info}</li>
                    )
                })}
                </ul>
            </div>
                {trainingInfo.map(info =>{
                return(
                    <TrainingList
                    title={info.title}
                    items={info.methods}
                    />
                )
            })}
            </div>
        </React.Fragment>
    )
};

export default AboutMe;


