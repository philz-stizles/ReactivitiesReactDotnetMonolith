import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Contact from '../pages/Contact'
import About from '../pages/About'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import ActivityDetailState from '../pages/activities/components/ActivityDetail.state'
import ActivityCreateState from '../pages/activities/ActivityCreate.state'
import ActivityEditState from '../pages/activities/ActivityEdit.state'
import ActivityDashboardState from '../pages/activities/ActivityDashboard.state'

const Routes = () => {
    return (
        <Switch>
            {/* exact is very important in the statement below*/}
            <Route exact path="/" component={Home} /> 
            <Route path="/auth" component={Auth} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route path="/activities" component={ActivityDashboardState} />
            <Route path="/activities/:id" component={ActivityDetailState} />
            <Route path="/activities/:id" component={ActivityEditState} />
            <Route path="/createActivity" component={ActivityCreateState} />
        </Switch>
    )
}

export default Routes
