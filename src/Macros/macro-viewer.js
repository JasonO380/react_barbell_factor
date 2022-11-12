import React, { useState, useContext } from "react";
import DropDownSelect from "../shared/UIElements/drop-down-select";
import { motion } from "framer-motion/dist/framer-motion";
import { LoginRegisterContext } from "../login/registration/components/context/login-register-context";
import DoughnutChart from "../shared/UIElements/DoughnutChart";

import "./macro-viewer.css";

let month;
const MacroViewer = () => {
    const auth = useContext(LoginRegisterContext);
    let userID;
    let foundMonth = [];
    let macroData;
    const [isSelectedMonthLoaded, setIsSelectedMonthLoaded] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState();
    const [macroMonth, setMacroMonth] = useState();

    const handleSelect = (event) => {
        console.log("here");
        const choice = event.target.value;
        month = event.target.value;
        setSelectedMonth(choice);
        console.log(selectedMonth);
        fetchMacros();
    };

    const fetchMacros = async () => {
        userID = auth.userID;
        try {
            const response = await fetch(
                `https://barbell-factor.herokuapp.com/api/macros/macroslog/${userID}`
            );
            const responseData = await response.json();
            const macros = responseData.macros;
            macroData = macros.reverse();
            setMacroMonth(macroData);
            getMonths();
        } catch (err) {}
    };

    const getMonths = () => {
        console.log("here in getMonths");
        macroData.map((macros) => {
            console.log(macros);
            if (month === macros.month) {
                setIsSelectedMonthLoaded(true);
                foundMonth.push(macros);
                foundMonth = macros;
                console.log(foundMonth);
            }
            if (foundMonth.length === 0) {
                console.log(foundMonth.length);
                setIsSelectedMonthLoaded(false);
                console.log(isSelectedMonthLoaded);
            }
        });
    };

    if (!selectedMonth && !isSelectedMonthLoaded) {
        return (
            <React.Fragment>
                <DropDownSelect
                    name={selectedMonth}
                    onChange={handleSelect}
                    isLoaded={setIsSelectedMonthLoaded}
                />
                <motion.div
                    className="center"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{
                        x: window.innerWidth,
                        transition: { duration: 0.2 },
                    }}
                >
                    <h2>Please select a month to view macro for that month</h2>
                </motion.div>
            </React.Fragment>
        );
    }

    if (!isSelectedMonthLoaded && selectedMonth) {
        return (
            <React.Fragment>
                <DropDownSelect
                    name={selectedMonth}
                    onChange={handleSelect}
                    isLoaded={setIsSelectedMonthLoaded}
                />
                <motion.div
                    className="center"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{
                        x: window.innerWidth,
                        transition: { duration: 0.2 },
                    }}
                >
                    <h2>No data yet for the selected month</h2>
                </motion.div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <DropDownSelect
                name={selectedMonth}
                onChange={handleSelect}
                isLoaded={setIsSelectedMonthLoaded}
            />
            <motion.div
                className="doughnut_container"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
            >
                {macroMonth.map((macros) => {
                    if (month === macros.month) {
                        return <DoughnutChart items2={macros} />;
                    }
                })}
            </motion.div>
        </React.Fragment>
    );
};

export default MacroViewer;
