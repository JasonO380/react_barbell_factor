import React, { useState } from "react";
import PageHeader from "../components/page-header";
import PageInfo from "../components/pageInfo";
import BioTrainingInfo from "../bio-training-info";
import infoItems from "../components/infoItems";
import Services from "../components/services";
import { motion } from 'framer-motion/dist/framer-motion';
import "./HomePage.css";


// const createPageInfo = (infoItems) =>{
//     return (
//         <PageInfo
//         infoTitle={infoItems.title}
//         infoDescription={infoItems.description}
//         />
//     )
// }


const HomePage = () => {
    // const info = infoItems.map(info => info);
    
    // const [isOpen, setIsopen] =useState(false);
    // const accordionHandler = () => {
    //     console.log("this works");
    //     setIsopen(true);
    //     if(isOpen){
    //         setIsopen(false);
    //     }
    // };
    return (
        <React.Fragment>
        <motion.div
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            <PageHeader />
            <BioTrainingInfo />
            <Services />
        </motion.div>
        </React.Fragment>
    )
};


export default HomePage;