import React from "react";
import MainNav from './shared/components/navigation/MainNav';
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