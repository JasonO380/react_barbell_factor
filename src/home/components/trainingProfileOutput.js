import React, { useState } from "react";
import { MdArrowDropDownCircle } from "react-icons/md";
import trainingInfo from "./training-profile-list";
import { CSSTransition } from "react-css-transition";
import "./trainingProfileOutput.css"



const TrainingList = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const accordionHandler = () =>{
        if(isOpen){
            console.log(isOpen);
            setIsOpen(false);
        } else{
            console.log(isOpen);
            setIsOpen(true);
        };
    }
    return (
        <div className="training_list">
            
                <header className="header">
                    <h3 onClick={accordionHandler} className="training_header">{props.title} <MdArrowDropDownCircle /></h3>
                </header>
                <ul className="list_frame" style={{
                        padding:!isOpen ? 0 : 15, 
                        margin:!isOpen ? 0 : 3,  
                        height: !isOpen ? 0 : "auto", 
                        opacity: !isOpen ? 0 : 1, 
                        transition: "all .2s ease-out" }}>
                {props.items.map(methods => {
                    return(
                            <li style= {{
                                padding:!isOpen ? 0 : 15, 
                                margin:!isOpen ? 0 : 3,
                                opacity: !isOpen ? 0 : 1, 
                                transition: "all .2s linear",
                                }} className="training_list_items">{methods}</li>
                    )
                })}
                </ul>
            
        </div>
    )
};


export default TrainingList;

