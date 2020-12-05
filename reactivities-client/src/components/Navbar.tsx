import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="ui menu">
            <NavLink to="/" exact activeClassName="active" className="item">Home</NavLink>
            <NavLink to="/about" activeClassName="active" className="item">About</NavLink>
            <NavLink to="/contact" activeClassName="active" className="item">Contact</NavLink>
            <NavLink to="/auth" activeClassName="active" className="item">Sign in</NavLink>
        </div>
    );
}

export default Navbar