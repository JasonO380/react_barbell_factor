import { createContext } from 'react';

export const LoginRegisterContext = createContext({
    isLoggedIn: false, 
    login: ()=> {}, 
    logout: ()=>{} });