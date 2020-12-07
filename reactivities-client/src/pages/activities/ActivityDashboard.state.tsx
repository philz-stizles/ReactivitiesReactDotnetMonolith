import React, { useState, useEffect, Fragment } from 'react'
import { Button, Container, Grid, Segment } from 'semantic-ui-react'
// import LoadingComponent from '../components/LoadingComponent'
import { Activities } from '../../api/agent'
import { IActivity } from '../../models/IActivity'
import ActivityList from './components/ActivityList.state'
import ActivityDetail from './components/ActivityDetail.state'
import ActivityForm from './components/ActivityForm.state'
import LoadingComponent from '../../components/LoadingComponent'

interface IActivityState {
    activities: IActivity[]
    selectedActivity: IActivity | null | undefined
}

const ActivityDashboardState = () => {
    const [activityState, setActivityState] = useState<IActivityState>({
        activities: [],
        selectedActivity: null
    })

    const [editMode, setEditMode] = useState(false)
    const [isLoading, setLoading] = useState(true)
    

    useEffect(() => {
        Activities.list()
            .then(activities => {
                setActivityState({
                    activities: activities.activities,
                    selectedActivity: activityState.selectedActivity
                });
            }).then(() => setLoading(false))
    }, [])

    const handleSelectActivity = (id: string) => {
        setActivityState({
            activities: activityState.activities,
            selectedActivity: activityState.activities.find(a => a.id == id)
        })
        setEditMode(false)
    }

    const handleSetActivity = (selectedActivity: IActivity | null) => {
        setActivityState({
            activities: activityState.activities,
            selectedActivity: selectedActivity
        })
    }

    const handleSetCreateMode = (editMode: boolean) => {
        setActivityState({
            activities: activityState.activities,
            selectedActivity: null
        })
        setEditMode(editMode)
    }

    const handleSetEditMode = (editMode: boolean) => {
        setEditMode(editMode)
    }

    const handleCreateActivity = (activity: IActivity) => {
        Activities.create(activity)
            .then(response => {
                setActivityState({
                    activities: [...activityState.activities, activity],
                    selectedActivity: activityState.selectedActivity
                });
                setEditMode(false)
            })
    }

    const handleEditActivity = (activity: IActivity) => {
        Activities.update(activity)
            .then(response => {
                setActivityState({
                    activities: [...activityState.activities.filter(a => a.id !== activity.id), activity],
                    selectedActivity: activity
                })
                setEditMode(false)
            })
    }

    const handleDeleteActivity = (id: string) => {
        Activities.delete(id)
            .then(response => {
                setActivityState({
                    activities: [...activityState.activities.filter(a => a.id !== id)],
                    selectedActivity: activityState.selectedActivity
                })
                setEditMode(false)
            })
    }

    if(isLoading) return <LoadingComponent content="Loading activities"/>
    
    return (
        <Container style={{ marginTop: '7em'}}>
            <Segment><Button onClick={() => handleSetCreateMode(true) } positive content="Create Activity" /></Segment>
            <Grid>
                <Grid.Column width={10}>
                    <h3>Activities</h3>
                    <ActivityList 
                        activities={activityState.activities} 
                        onActivitySelect={handleSelectActivity} 
                        onActivityDelete={handleDeleteActivity} />
                </Grid.Column>
                <Grid.Column width={6}>
                    
                    { activityState.selectedActivity && !editMode && 
                        <Fragment>
                            <h3>Detail</h3>
                            <ActivityDetail 
                                selectedActivity={activityState.selectedActivity}
                                onSetActivity={handleSetActivity}
                                onSetEditMode={handleSetEditMode}/>
                        </Fragment>
                    }
                    { editMode && 
                        <Fragment>
                            <h3>Create Activity</h3>

                            <ActivityForm
                                key={activityState.selectedActivity && activityState.selectedActivity.id || 0} 
                                activity={activityState.selectedActivity!} 
                                onCreateActivity={handleCreateActivity}
                                onEditActivity={handleEditActivity}
                                onSetEditMode={handleSetEditMode} />
                        </Fragment>
                    }
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default ActivityDashboardState
