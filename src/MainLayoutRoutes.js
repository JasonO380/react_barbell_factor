import React, { useState, useCallback } from "react";
import MainNav from './shared/components/navigation/MainNav';
import AnimatedRoutes from "./AnimatedRoutes";
import Footer from './shared/footer/footer';
import { LoginRegisterContext } from "./login/registration/components/context/login-register-context";

const MainLayoutRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
        const login = useCallback(()=> {
            setIsLoggedIn(true);
        },[]);
        const logout = useCallback(()=> {
            setIsLoggedIn(false);
        },[]);
    return(
        <LoginRegisterContext.Provider 
            value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
        <React.Fragment>
            <nav>
                <MainNav />
            </nav>
            <AnimatedRoutes />
            <footer>
                <Footer />
            </footer>
        </React.Fragment>
        </LoginRegisterContext.Provider>
    )
};

export default MainLayoutRoutes;