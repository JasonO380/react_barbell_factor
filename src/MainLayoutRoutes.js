import React from "react";
import { 
    BrowserRouter as Router, 
    Route,
    Routes, 
    Redirect, 
    Switch 
    } from "react-router-dom";
import MainNav from './shared/components/navigation/MainNav';
import HomePage from './home/pages/HomePage';
import Dashboard from './dashboard/components/dashboard';
import DashboardOutput from "./dashboard/components/dashboard-output";
import UpdateMacros from "./dashboard/components/update-macros";
import GetMacros from "./dashboard/components/get-macros";
import AnimatedRoutes from "./AnimatedRoutes";
import Footer from './shared/footer/footer';

const MainLayoutRoutes = () => {
    return(
        <React.Fragment>
            <nav>
                <MainNav />
            </nav>
            <AnimatedRoutes />
            <footer>
                <Footer />
            </footer>
        </React.Fragment>
    )
};

export default MainLayoutRoutes;