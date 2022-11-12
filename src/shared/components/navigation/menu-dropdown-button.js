import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import "./menu-dropdown-button.css";

const DropdownMenu = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown_button">
                Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/">
                    Home
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/macrolog">
                    Macro logger
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/macrosgraph">
                    Macro viewer
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/workoutlog">
                    Workout logger
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/workoutview">
                    Workout viewer
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownMenu;
