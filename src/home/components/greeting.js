import React from "react";
import AboutMe from "./about-me";
import greetingInfo from "./greeting-info";

const Greeting = (props) => {
    return (
        <div className="greeting_main">
            {greetingInfo.map((info) => {
                return <AboutMe title={info.title} items={info.description} />;
            })}
        </div>
    );
};

export default Greeting;
