import React from "react";
import HomePage from "./home/pages/HomePage";
import Dashboard from './dashboard/components/dashboard';
import UpdateMacros from "./dashboard/components/update-macros";
import GetMacros from "./dashboard/components/get-macros";
import { 
    BrowserRouter as Router, 
    Route,
    Routes, 
    Redirect, 
    Switch,
    useLocation 
    } from "react-router-dom";
import { AnimatePresence } from 'framer-motion/dist/framer-motion';



    const AnimatedRoutes = () => {
        const location = useLocation();
        return(
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/:mid" element={<UpdateMacros />} />
                        <Route path="/macrosgraph" element={<GetMacros />} />
                </Routes>
            </AnimatePresence>
        )
    }

    export default AnimatedRoutes;