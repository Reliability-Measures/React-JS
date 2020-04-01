import React from "react";
import { NavLink } from 'react-router-dom';
import './components.css'

const Navigation = () => {
  return (
    <div>
      <nav className="navbar navbar-light navcol">
        <NavLink className="navbar-brand nac" to="/">Reliability Measures</NavLink>
        <button className="navbar-toggler mr-auto" data-toggle="collapse" data-target="#navbarMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar nav">
            <li className="nav-item">
              <NavLink className="nav-link nac" to="/std">Standard Deviaton</NavLink>
              <NavLink className="nav-link nac" to="/sum">Summation</NavLink>
              <NavLink className="nav-link nac" to="/prop">Proportion</NavLink>
              <NavLink className="nav-link nac" to="/kr20">Kr20</NavLink>
              <NavLink className="nav-link nac" to="/pbcc">Pbcc</NavLink>
              <NavLink className="nav-link nac" to="/testdata">Testdata</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;