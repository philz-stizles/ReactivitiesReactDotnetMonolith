import React, { useContext, useEffect } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import ActivityList from './components/ActivityList.mobx'
// import ActivityDetail from './components/ActivityDetail.mobx'
// import ActivityForm from './components/ActivityForm.mobx'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../data/mobx/rootStore'
// import { RootStoreContext } from '../../../data/mobx/rootStore'

const ActivityDashboardMobx = () => {
    // const {activityStore: { setCreateMode } } = useContext(RootStoreContext)
    const { activityStore, commonStore } = useContext(RootStoreContext);
    const {loadActivities} = activityStore
    const {setAppLoaded, token} = commonStore

    useEffect(() => {
        console.log('useeffect - activitydashboard')
        loadActivities();
    }, [loadActivities]);
    
    return (
        <Container style={{ marginTop: '7em'}}>
            <Grid>
                <Grid.Column width={10}>
                    <h3>Activities</h3>
                    <ActivityList />
                </Grid.Column>
                <Grid.Column width={6}>
                    <h2>Activity filters</h2>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default observer(ActivityDashboardMobx)
