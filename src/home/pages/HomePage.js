import React from "react";

import PageInfo from "../components/pageInfo";
import infoItems from "../components/infoItems";
import Services from "../components/services";
import Greeting from "../components/greeting";
import { motion } from 'framer-motion/dist/framer-motion';
import "./HomePage.css";


const createPageInfo = (infoItems) =>{
    return (
        <PageInfo
        infoTitle={infoItems.title}
        infoDescription={infoItems.description}
        />
    )
}


const HomePage = () => {
    return (
        <React.Fragment>
        <motion.div
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            <div className="page-info">
                {infoItems.map(createPageInfo)}
            </div>
            <Greeting />
            <Services />
        </motion.div>
        </React.Fragment>
    )
};


export default HomePage;