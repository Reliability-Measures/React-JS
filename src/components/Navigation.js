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
              <NavLink className="nav-link nac" to="/">Analyze</NavLink>
              <NavLink className="nav-link nac" to="/old">Analyze old</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;