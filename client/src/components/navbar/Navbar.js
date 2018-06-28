import React from 'react';
import { NavLink } from "react-router-dom";

import "./Navbar.css"

const Navbar = (props) => {
  console.log(props)
  return (
    <div id="Navbar">
      <NavLink to="/" exact activeClassName="active"><i className="material-icons">person_pin</i></NavLink>
      <NavLink to="/posts" activeClassName="active"><i className="material-icons">message</i></NavLink>
      <NavLink to="/todos" activeClassName="active"><i className="material-icons">assignment_ind</i></NavLink>
      <NavLink to="/comments" activeClassName="active"><i className="material-icons">comment</i></NavLink>
    </div>
  )
}

export default Navbar;
