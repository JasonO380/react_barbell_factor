import React from "react";
import Card from "../../shared/UIElements/Card";

import "./pageInfo.css";




const PageInfo = (props) => {
    return (          
            <div className="pageinfo_card">
                <header className="pageInfo-header">
                <h2>{props.infoTitle}</h2>
                </header>
                <p>{props.infoDescription}</p>
            </div>
        )
};

export default PageInfo;


