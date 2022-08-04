import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import "./menu-dropdown-button.css";

const DropdownMenu = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown_button">
            Menu
            </Dropdown.Toggle>
    
            <Dropdown.Menu>
                <Dropdown.Item href="/">Home</Dropdown.Item>
                <Dropdown.Item href="/dashboard">Macro logger</Dropdown.Item>
                <Dropdown.Item href="macrosgraph">Macro viewer</Dropdown.Item>
                <Dropdown.Item href="workoutlog">Workout logger</Dropdown.Item>
                <Dropdown.Item href="workoutview">Workout viewer</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownMenu;

{/* <Route path="/" element={<HomePage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/workoutlog" element={<Workout />} />
                        <Route path="/workoutview" element={<GetAllWorkoutData />} />
                        <Route path="/workouttest" element={<TestWorkoutArea />} />
                        <Route path="/dashboard/:mid" element={<UpdateMacros />} />
                        <Route path="/macrosgraph" element={<GetMacros />} /> */}