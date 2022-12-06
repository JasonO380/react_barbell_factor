import React, { useState, useRef } from "react";
import profilepic from "../profilepic.jpeg";
import barbellfactor from "../barbellfactor.jpeg";
import greetingInfo from "./components/greeting-info";
import trainingInfo from "./components/training-profile-list";
import CardFlip from "./card-flip";
import { MdArrowDropDownCircle } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

import "./bio-training-info.css";

let items;

const BioTrainingInfo = (props) => {
    let data;
    const [isOpen, setIsOpen] = useState(false);
    const [flip, setFlip] = useState(false);
    const [listItems, setListItems] = useState();
    const bioTitle = trainingInfo.map((data) => data.title);
    const methodTitle = greetingInfo.map((data) => data.title);
    const trainingDesc = trainingInfo.map((data) => data.methods);
    const bioInfo = greetingInfo.map((data) => data.description);
    const refPoint = useRef(null);

    const accordionToggle = (event) => {
        data = event.target.id;
        console.log(event.target.id);

        if (data === "Jason Ollada") {
            greetingInfo.map((data) => {
                items = data.description;
                setListItems(items);
            });
        }
        if (data === "Methodology") {
            trainingInfo.map((data) => {
                items = data.methods;
                setListItems(items);
            });
        }
        if (!isOpen) {
            setIsOpen(true);
        } else {
            accordionFlip();
        }
        console.log(isOpen);
    };

    //helper function to flip div
    const accordionFlip = () => {
        setIsOpen(false);
        console.log(listItems);
        console.log(items);
        if (listItems !== items) {
            setIsOpen(true);
            setFlip(true);
            console.log("different");
        }
        if (listItems === items) {
            console.log("same");
            setFlip(false);
            setIsOpen(false);
        }
    };

    return (
        <React.Fragment>
            <div className="aboutme">
                <div className="profile_card">
                    <img
                        className="profile_pic"
                        src={profilepic}
                        alt="Profile Pic"
                    />
                </div>
                <div className="main_logo_box">
                    <img className="main_logo" src={barbellfactor} />
                </div>
            </div>
            <motion.div>
                <AnimatePresence>
                    <motion.div
                        className="bio_container"
                        onClick={accordionToggle}
                    >
                        <motion.div className="bio_info">
                            <header className="header">
                                <motion.h3
                                    whileTap={{ scale: 0.8 }}
                                    onClick={accordionToggle}
                                    className="about_me_header"
                                    id={methodTitle}
                                >
                                    {methodTitle} <MdArrowDropDownCircle />
                                </motion.h3>
                            </header>
                        </motion.div>
                        <motion.div className="bio_info">
                            <header className="header">
                                <motion.h3
                                    whileTap={{ scale: 0.8 }}
                                    onClick={accordionToggle}
                                    className="about_me_header"
                                    id={bioTitle}
                                >
                                    {bioTitle} <MdArrowDropDownCircle />
                                </motion.h3>
                            </header>
                        </motion.div>
                    </motion.div>
                    <AnimatePresence>
                        {isOpen && <CardFlip items={items} />}
                    </AnimatePresence>
                </AnimatePresence>
            </motion.div>
        </React.Fragment>
    );
};

export default BioTrainingInfo;
