import React, { useState } from "react";
import PageHeader from "../components/page-header";
import PageInfo from "../components/pageInfo";
import RegisterLoginPageInfo from "../components/register-login-page_info";
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
    const info = infoItems.map(info => info);
    
    const [isOpen, setIsopen] =useState(false);
    const accordionHandler = () => {
        console.log("this works");
        setIsopen(true);
        if(isOpen){
            setIsopen(false);
        }
    };
    return (
        <React.Fragment>
        <motion.div
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
        <PageHeader />
            {/* <div className="page-info">
                {infoItems.map(createPageInfo)}
            </div> */}
                    {/* <RegisterLoginPageInfo
                    onClick={accordionHandler}
                    items={info}
                    style= {{
                        // padding:!isOpen ? 0 : 15, 
                        // margin:!isOpen ? 0 : 3,
                        width: !isOpen ? 0 : "fit-content",
                        height: !isOpen ? 0 : "auto", 
                        opacity: !isOpen ? 0 : 1, 
                        transition: "all .2s ease-out"
                    }} /> */}

            <Greeting />
            <Services />
        </motion.div>
        </React.Fragment>
    )
};


export default HomePage;