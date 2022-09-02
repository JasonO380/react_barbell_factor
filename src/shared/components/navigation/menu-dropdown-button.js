import React from 'react';
import { NavLink } from "react-router-dom";
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
                <Dropdown.Item href="/workoutlog">Workout logger</Dropdown.Item>
                <Dropdown.Item href="workoutview">Workout viewer</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownMenu;

                // <NavLink to="/"></NavLink>
                // <Dropdown.Item href="/">Home</Dropdown.Item>
                // <NavLink to="/dashboard"></NavLink>
                // <Dropdown.Item href="/dashboard">Macro logger</Dropdown.Item>
                // <NavLink to="/macrosgraph"></NavLink>
                // <Dropdown.Item href="/macrosgraph">Macro viewer</Dropdown.Item>
                // <NavLink to="/workoutlog"></NavLink>
                // <Dropdown.Item href="/workoutlog">Workout logger</Dropdown.Item>
                // <NavLink to="/workoutview"></NavLink>
                // <Dropdown.Item href="/workoutview">Workout viewer</Dropdown.Item>