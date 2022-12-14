import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayoutRoutes from "./MainLayoutRoutes";

import "./App.css";

function App() {
    return (
        <Router>
            <Routes basename="/">
                <Route path="*" element={<MainLayoutRoutes />} />
            </Routes>
        </Router>
    );
}

export default App;
