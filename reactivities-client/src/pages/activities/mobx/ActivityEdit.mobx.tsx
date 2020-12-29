import React, {  } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import ActivityFormMobx from './components/ActivityForm.mobx'
import { Container, Grid } from 'semantic-ui-react'

interface DetailParams {
    id: string
}

const ActivityEditMobx: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const redirectTo = (location: string) => {
        history.push(location)
    }

    return (
        <Container style={{ marginTop: '7em'}}>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityFormMobx id={match.params.id} onRedirectTo={(location: string) => redirectTo(location)} />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default observer(ActivityEditMobx)