import React from "react";

const RegisterLoginPageInfo = (props) => {
    return (
        <div className="center">
            <div>
                <button className="form_button">REGISTER</button>
                <button className="form_button">LOGIN</button>
            </div>
            <div>
                <h2 onClick={props.onClick}>PAGE INFO</h2>
            </div>
            <div className="page_info_accordion_container">
                {props.items.map((info) => {
                    return (
                        <div style={props.style}>
                            <h4 style={props.style}>{info.title}</h4>
                            <ul className="list_frame" style={props.style}>
                                <li
                                    className="about_list_item"
                                    style={props.style}
                                >
                                    {info.description}
                                </li>
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RegisterLoginPageInfo;
