import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container, Grid } from 'semantic-ui-react'
import LoadingComponent from '../../components/LoadingComponent'
import { RootStoreContext } from '../../data/mobx/rootStore'
import ProfileContent from './components/ProfileContent'
import ProfileHeader from './components/ProfileHeader'

interface RouteParams {
    username: string
}

interface IProps extends RouteComponentProps<RouteParams> {}

const Profile: React.FC<IProps> = ({ match }) => {
    const { profileStore } = useContext(RootStoreContext)
    const { loadProfile, profile, isLoading} = profileStore

    useEffect(() => {
        loadProfile(match.params.username)
    }, [loadProfile, match])

    if(isLoading) return <LoadingComponent content="Loading profile ..." />

    return (
        <Container style={{ marginTop: "7rem" }}>
            <Grid>
                <Grid.Column width={16}>
                    <ProfileHeader profile={profile!} />
                    <ProfileContent />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default observer(Profile)
