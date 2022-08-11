import React from "react";
import HomePage from "./home/pages/HomePage";
import Dashboard from './dashboard/components/dashboard';
import UpdateMacros from "./dashboard/components/update-macros";
import GetMacros from "./dashboard/components/get-macros";
import GetAllWorkoutData from "./dashboard/components/get-all-workouts";
import TestWorkoutArea from "./dashboard/components/get-all-workouts-testarea";
import WorkoutForm from "./dashboard/components/workout-form";
import Workout from "./home/pages/workout-tracker";
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
                        <Route path="/workoutlog" element={<Workout />} />
                        <Route path="/workoutview" element={<GetAllWorkoutData />} />
                        <Route path="/workouttest" element={<TestWorkoutArea />} />
                        <Route path="/dashboard/:mid" element={<UpdateMacros />} />
                        <Route path="/macrosgraph" element={<GetMacros />} />
                </Routes>
            </AnimatePresence>
        )
    }

    export default AnimatedRoutes;