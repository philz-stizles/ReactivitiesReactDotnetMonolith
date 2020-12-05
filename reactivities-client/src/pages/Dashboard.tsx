import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Grid, List } from 'semantic-ui-react'
import ActivityStore from '../data/mobx/activityStore'

const Dashboard = () => {
    const activityStore = useContext(ActivityStore)

    useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore])

    if(activityStore.isLoading) return <LoadingComponent content="Loading activities"/>
    return (
        <Grid>
            <Grid.Row width={10}>

            </Grid.Row>
            <Grid.Row width={10}>
                <List>
                    {activityStore.activities.map(activity => {
                        
                    })}
                </List>
            </Grid.Row>
        </Grid>
    )
}

export default observer(Dashboard)
