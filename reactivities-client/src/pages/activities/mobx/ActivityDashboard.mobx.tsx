import React, { Fragment, useContext } from 'react'
import { Button, Container, Grid, Segment } from 'semantic-ui-react'
import ActivityList from './components/ActivityList.mobx'
import ActivityDetail from './components/ActivityDetail.mobx'
import ActivityForm from './components/ActivityForm.mobx'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../data/mobx/rootStore'

const ActivityDashboardMobx = () => {
    const {activityStore: { editMode, setCreateMode, selectedActivity } } = useContext(RootStoreContext)

    return (
        <Container style={{ marginTop: '7em'}}>
            <Segment><Button onClick={setCreateMode} positive content="Create Activity" /></Segment>
            <Grid>
                <Grid.Column width={10}>
                    <h3>Activities</h3>
                    <ActivityList />
                </Grid.Column>
                <Grid.Column width={6}>
                    { selectedActivity && !editMode && 
                       ( <Fragment>
                            <h3>Detail</h3>
                            <ActivityDetail />
                        </Fragment>)
                    }
                    { editMode && 
                        (<Fragment>
                            <h3>Create Activity</h3>
                            <ActivityForm key={(selectedActivity && selectedActivity.id) || 0}/>
                        </Fragment>)
                    }
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default observer(ActivityDashboardMobx)
