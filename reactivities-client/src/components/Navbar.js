import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div class="ui menu">
                <NavLink to="/" exact activeClassName="active" className="item">Home</NavLink>
                <NavLink to="/about" activeClassName="active" className="item">About</NavLink>
                <NavLink to="/contact" activeClassName="active" className="item">Contact</NavLink>
            </div>
        )
    }
}