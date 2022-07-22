import React from "react";
import Card from "../../shared/UIElements/Card";
import "./serviceoutput.css";

const ServicesOutPut = (props) => {
    return(
        <div className="services_wrapper">
            <h3 className="services_heading">{props.title}</h3>
            <p className="services_description">{props.description}</p>
        </div>
    )
};

export default ServicesOutPut;