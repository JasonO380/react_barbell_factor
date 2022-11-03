import React from "react";
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';



const CardFlip = (props) => {
    const newItems = props.items
    return(
        <AnimatePresence exitBeforeEnter>
                <motion.div
                            key={newItems}
                            initial={{
                                height:0, 
                                opacity: 0 }}
                            animate={{
                            rotateY:360,
                            opacity: 1,
                            margin:"auto",
                            height:"auto",
                            transition: {
                                duration: .55,
                            },
                            }}
                            exit={{
                                height:0, 
                                opacity: 0 }}
                            className="list_frame"
                            >
                            {props.items.map(data=> {
                                return(
                                    <motion.li
                                    key={newItems}
                                    initial={{
                                        height:0, 
                                        opacity: 0 }}
                                    animate={{
                                    opacity: 1,
                                    height:"auto",
                                    transition: {delay:.4},
                                    }}
                                    exit={{
                                        height:0,
                                        opacity: 0 }} 
                                    className="about_list_item">{data}</motion.li>
                                )
                            })}
                            </motion.div>
        </AnimatePresence>)
}

export default CardFlip;