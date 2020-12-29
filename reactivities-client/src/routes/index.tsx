import React from 'react'
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom'
import Contact from '../pages/Contact/Contact'
import About from '../pages/About/About'
import Home from '../pages/Home'
import Register from '../pages/Auth/mobx/Register.mobx'
import Login from '../pages/Auth/mobx/Login.mobx'
import { NotFound } from '../pages/NotFound/NotFound'
import ActivityDetail from '../pages/activities/mobx/ActivityDetail.mobx'
import ActivityEdit from '../pages/activities/mobx/ActivityEdit.mobx'
import ActivityDashboard from '../pages/activities/mobx/ActivityDashboard.mobx'
import Profile from '../pages/Profile/Profile'

const Routes: React.FC<RouteComponentProps> = ({location}) => {
    return (
        // <Container style={{ marginTop: '7em' }}>
            <Switch>
                {/* exact is very important in the statement below*/}
                <Route exact path="/" component={Home} /> 
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/contact" component={Contact} />
                <Route path="/about" component={About} />
                {/* exact is very important in the statement below*/}
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetail} />
                <Route path="/profile/:username" component={Profile} />
                {/* <Route path="/manage/:id" component={ActivityEdit} /> */}
                <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityEdit} />
                <Route component={NotFound} />
            </Switch>
        // </Container>
    )
}

export default withRouter(Routes)
