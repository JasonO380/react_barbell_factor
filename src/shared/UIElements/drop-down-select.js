import React from "react";
import months from "./month-select-options";
import { motion } from "framer-motion/dist/framer-motion";

import "./drop-down-select.css";

const DropDownSelect = (props) => {
    return (
        <motion.div
            className="select_container"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
        >
            <label className="select_label">Select Month</label>
            <select
                className="select_field"
                name={props.name}
                isLoaded={props.isLoaded}
                onChange={props.onChange}
            >
                {months.map((month) => {
                    return (
                        <option className="select_option">{month.month}</option>
                    );
                })}
            </select>
        </motion.div>
    );
};

export default DropDownSelect;
