import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Contact from '../pages/Contact'
import About from '../pages/About'
import Home from '../pages/Home'

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/contact"><Contact /></Route>
                <Route path="/about"><About /></Route>
                <Route path="/"><Home /></Route>
            </Switch>
        )
    }
}
