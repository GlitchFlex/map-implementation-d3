import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import { Navigator } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="container">
        <div className="nav">
            <NavLink exact="true" to="/" className="homeLink">
                Country View
            </NavLink>
            <NavLink exact="true" to="/state" className="homeLink">
                State View
            </NavLink>
                
            
        </div>
        </div>
    );
}

export default Navbar;
