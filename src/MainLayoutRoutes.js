import React, { useState, useCallback, useEffect } from "react";
import MainNav from './shared/components/navigation/MainNav';
import AnimatedRoutes from "./AnimatedRoutes";
import Footer from './shared/footer/footer';
import { LoginRegisterContext } from "./login/registration/components/context/login-register-context";


let logoutTimer;

const MainLayoutRoutes = () => {
    const [token, setToken] = useState(false);
    const [tokenTimer, setTokenTimer] = useState();
    // const [isLoggedIn, setIsloggedIn] = useState(false);
    const [userID, setUserID]= useState();


        const login = useCallback((uid, token, expirationDate)=> {
            // setIsloggedIn(true);
            setToken(token);
            setUserID(uid);
            const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
            setTokenTimer(tokenExpiration);
            localStorage.setItem(
                'userData', 
                JSON.stringify({
                    userID: uid, 
                    token: token,
                    expiration: tokenExpiration.toISOString()
                }));
        },[]);

        const logout = useCallback(()=> {
            setToken(null);
            // setIsloggedIn(false);
            setTokenTimer(null);
            setUserID(null);
            localStorage.removeItem('userData');
        },[]);
        // console.log('here');
        // console.log(userID);
        // console.log(token);

        useEffect(()=> {
            if (token && tokenTimer){
                const remainingTime = tokenTimer.getTime() - new Date().getTime();
                logoutTimer = setTimeout(logout, remainingTime);
            } else {
                clearTimeout(logoutTimer);
            }
        },[token, logout, tokenTimer])

        useEffect(()=>{
            const storedData = JSON.parse(localStorage.getItem('userData'));
            console.log(storedData);
            if(storedData && 
                storedData.token && 
                new Date (storedData.expiration) > new Date()){
                login(storedData.userID, storedData.token, new Date(storedData.expiration)) ;
            }
        },[login])
    return(
        <LoginRegisterContext.Provider 
            value=
            {{isLoggedIn: !!token,
            token: token,
            userID: userID, 
            login: login, 
            logout: logout}}>
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