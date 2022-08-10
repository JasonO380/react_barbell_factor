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
                        <Route path="/react_barbell_factor" element={<HomePage />} />
                        <Route path="/react_barbell_factor/dashboard" element={<Dashboard />} />
                        <Route path="/react_barbell_factor/workoutlog" element={<Workout />} />
                        <Route path="/react_barbell_factor/workoutview" element={<GetAllWorkoutData />} />
                        <Route path="/react_barbell_factor/workouttest" element={<TestWorkoutArea />} />
                        <Route path="/react_barbell_factor/dashboard/:mid" element={<UpdateMacros />} />
                        <Route path="/react_barbell_factor/macrosgraph" element={<GetMacros />} />
                </Routes>
            </AnimatePresence>
        )
    }

    export default AnimatedRoutes;