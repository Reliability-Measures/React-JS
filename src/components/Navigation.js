import React from "react";
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/std">STD</NavLink>
      <NavLink to="/sum">Summation</NavLink>
      <NavLink to="/prop">Proportion</NavLink>
      <NavLink to="/kr20">Kr20</NavLink>
      <NavLink to="/pbcc">Pbcc</NavLink>
    </div>
  );
};

export default Navigation;