import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container, Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../components/LoadingComponent'
import { RootStoreContext } from '../../../data/mobx/rootStore'
import ActivityDetailChat from './components/ActivityDetailChat.mobx'
import ActivityDetailHeader from './components/ActivityDetailHeader.mobx'
import ActivityDetailInfo from './components/ActivityDetailInfo.mobx'
import ActivityDetailSidebar  from './components/ActivityDetailSidebar.mobx'

interface DetailParams {
    id: string
}

const ActivityDetailMobx : React.FC<RouteComponentProps<DetailParams>>= ({ history, match }) => {
    const { activityStore: { selectedActivity, loadActivity, isLoading } } = useContext(RootStoreContext)

    useEffect(() => {
        loadActivity(match.params.id)
            .catch(() => {
                history.push('/notfound')
            })
    }, [loadActivity, match.params.id, history])

    if(isLoading || !selectedActivity) return <LoadingComponent content='Loading activitiy ...' />

    return (
        <Container style={{ marginTop: '7em'}}>
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={selectedActivity} />
                <ActivityDetailInfo activity={selectedActivity} />
                <ActivityDetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailSidebar />
            </Grid.Column>
        </Grid>
        </Container>
    )
}

export default observer(ActivityDetailMobx)