import React, { useState, useEffect, Fragment, useContext } from 'react'
import { Button, Container, Grid, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../models/IActivity'
import LoadingComponent from '../../../components/LoadingComponent'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../data/mobx/activityStore'
import ActivityList from './components/ActivityList.mobx'
import ActivityDetail from './components/ActivityDetail.mobx'

const ActivityDashboardMobx = () => {
    const activityStore = useContext(ActivityStore)
    
    useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore])
    
    const handleSelectActivity = (id: string) => {
        activityStore.selectActivity(id)
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
        setSubmitting(true)
        
    }

    const handleEditActivity = (activity: IActivity) => {
        activityStore.editActivity(activity)
    }

    const handleDeleteActivity = (id: string) => {
        activityStore.deleteActivity(id)
    }

    if(activityStore.isLoading) return <LoadingComponent content="Loading activities"/>
    
    return (
        <Container style={{ marginTop: '7em'}}>
            <Segment><Button onClick={() => handleSetCreateMode(true) } positive content="Create Activity" /></Segment>
            <Grid>
                <Grid.Column width={10}>
                    <h3>Activities</h3>
                    <ActivityList 
                        onActivitySelect={handleSelectActivity} 
                        onActivityDelete={handleDeleteActivity}
                        isSubmitting={submitting}  />
                </Grid.Column>
                <Grid.Column width={6}>
                    
                    { activityStore.selectedActivity && !activityStore.editMode && 
                        <Fragment>
                            <h3>Detail</h3>
                            <ActivityDetail onSetActivity={handleSetActivity} onSetEditMode={handleSetEditMode}/>
                        </Fragment>
                    }
                    { activityStore.editMode && 
                        <Fragment>
                            <h3>Create Activity</h3>

                            <ActivityForm
                                key={activityState.selectedActivity && activityState.selectedActivity.id || 0} 
                                activity={activityState.selectedActivity!} 
                                onCreateActivity={handleCreateActivity}
                                onEditActivity={handleEditActivity}
                                onSetEditMode={handleSetEditMode} 
                                isSubmitting={submitting}/>
                        </Fragment>
                    }
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default observer(ActivityDashboardMobx)
