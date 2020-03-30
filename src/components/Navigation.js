import React from "react";
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './components.css'

const Navigation = () => {
  return (
    <div>
      <Nav className="flex-column navbarc">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/std">Standard Deviaton</NavLink>
        <NavLink to="/sum">Summation</NavLink>
        <NavLink to="/prop">Proportion</NavLink>
        <NavLink to="/kr20">Kr20</NavLink>
        <NavLink to="/pbcc">Pbcc</NavLink>
      </Nav>
    </div>
  );
};

export default Navigation;