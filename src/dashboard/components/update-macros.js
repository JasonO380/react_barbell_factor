import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import macroData from "./macro-items";
import { motion } from 'framer-motion/dist/framer-motion';
import "./update-macros.css";


const UpdateMacros = (props) => {
    const macroID= useParams().mid;
    const foundMacros = macroData.find(macro => macro.id === macroID);
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [updateData, setUpdateData] = useState({
        id:"",
        day:"",
        carbs:"",
        protein:"",
        fats:""
    });

    const changeHandler = (event) => {
        const macro = event.target.value;
        const macroName = event.target.name;
        const uid = uuidv4();
        setUpdateData(preValue => {
            return {
                ...preValue,
                [macroName]: macro,
                id:uid,
                day:uid
            }
        });
    };

    const postUpdateMacroData = (event) => {
        console.log(updateData);
        if(updateData.carbs.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } 
        if (updateData.carbs.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            console.log(isValid);
            return null;
        } 
        if (updateData.protein.length === 0){
                setIsValid(false);
                setFormIsValid(false);
                return null;
            }
        if (updateData.fats.length === 0){
            setIsValid(false);
            setFormIsValid(false);
            return null;
        } 
        setUpdateData({
            carbs:"",
            fats:"",
            protein:""
        });
        setFormIsValid(true);
        event.preventDefault();
        navigate('/dashboard');
    };

    if(!foundMacros){
        return <h2>NO MACROS FOUND BRUH!!!!</h2>
    }


    return (
        <React.Fragment>
        <motion.div
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            <div className="update_form_header">
            <h2>{foundMacros.day}</h2>
            </div>
            <form class="update_form_container">
                <div className="form_inputs">
                        <h4>Carbs</h4>
                        <input
                        required
                        id="carbs"
                        element="input"
                        type="text"
                        name="carbs"
                        label="Carbs"
                        // value={foundMacros.carbs}
                        errorText="Please enter your carb intake in grams"
                        placeholder={foundMacros.carbs}
                        onChange={changeHandler} />
                    </div>
                    <div className="form_inputs">
                        <h4>Protein</h4>
                        <input
                        required
                        id="protein"
                        element="input"
                        type="text"
                        name="protein"
                        label="Protein"
                        // value={foundMacros.protein}
                        errorText="Please enter your protein intake in grams"
                        placeholder={foundMacros.protein}
                        onChange={changeHandler} />
                    </div>
                    <div className="form_inputs">
                        <h4>Fats</h4>
                        <input
                        required
                        id="fats"
                        element="input"
                        type="text"
                        name="fats"
                        label="Fats"
                        // value={foundMacros.fats}
                        errorText="Please enter your fat intake in grams"
                        placeholder={foundMacros.fats}
                        onChange={changeHandler} />
                    </div>
                        <button
                        className="form_button" 
                        onClick={postUpdateMacroData}>Click me</button>
            </form>
        </motion.div>
        </React.Fragment>
    );
};

export default UpdateMacros;


// {/* <div className="dashboard_card_graph">
// <div>
// <p>THIS WILL BE A GRAPH</p>
// <label>Protein:</label><input
// name="protein"
// onChange={changeHandler}
// placeholder="Update protein in grams" />

// <label>Carbs:</label><input
// name="carbs"
// onChange={changeHandler}
// placeholder="Update carbs in grams" />

// <label>Fats:</label><input
// name="fats"
// onChange={changeHandler}
// placeholder="Update fats in grams" />
// {/* <p className="protein_graph">Protein {macros.protein}</p>
// <p className="carbs_graph">Carbs {macros.carbs}</p>
// <p className="fats_graph">Fats {macros.fats}</p> */}
// {/* <button onClick={closeUpdateHandler}>UPDATE</button> */}
// <NavLink to="/dashboard">UPDATE</NavLink>
// </div>
// </div> */}