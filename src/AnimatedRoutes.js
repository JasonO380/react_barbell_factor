import React from "react";
import HomePage from "./home/pages/HomePage";
import Register from "./login/registration/components/register";
import Login from "./login/registration/components/login";
import Dashboard from "./dashboard/components/dashboard";
import WorkoutEditMode from "./workouts/workout-edit-mode";
import MacroViewer from "./Macros/macro-viewer";
import MacroEdit from "./Macros/macro-edit";
import GetAllWorkoutData from "./workouts/get-all-workouts";
import MacroLogger from "./Macros/macro-logger";
import WorkoutTracker from "./workouts/workout-tracker";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/macrolog" element={<MacroLogger />} />
                <Route path="/editmacromode" element={<MacroEdit />} />
                <Route path="/workouteditmode" element={<WorkoutEditMode />} />
                <Route path="/workoutlog" element={<WorkoutTracker />} />
                <Route path="/workoutview" element={<GetAllWorkoutData />} />
                <Route path="/macrosgraph" element={<MacroViewer />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
