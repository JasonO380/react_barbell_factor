import React from "react";
import PageInfo from "./pageInfo";
import ServicesOutPut from "./servicesoutput";
import serviceInfo from "./serviceItems";

import "./services.css";


const createService = (serviceInfo) => {
        return(
            <ServicesOutPut
            title={serviceInfo.title}
            description={serviceInfo.description} />
        )
};

const Services = (props) => {
    return (
        <React.Fragment>
            <div className="heading">
            <header>
                <h1>SERVICES</h1>
            </header>
            </div>
                <div className="page_info_services">
                    {serviceInfo.map(createService)}
                </div>
        </React.Fragment>
    )
}

export default Services;