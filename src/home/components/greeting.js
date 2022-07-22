import React, { useState } from "react";
import Card from "../../shared/UIElements/Card";
import PageInfo from "./pageInfo";
import { profilepic } from "../../profilepic.jpeg";
import AboutMe from "./about-me";
import greetingInfo from "./greeting-info";
import trainingInfo from "./training-profile-list";
import TrainingList from "./trainingProfileOutput";



const Greeting = (props) => {
    return(
        <div className="greeting_main">
            {greetingInfo.map(info =>{
                return(
                    <AboutMe
                    title={info.title}
                    items={info.description}
                    />
                )
            })}
        </div>
    )
    }


export default Greeting;

