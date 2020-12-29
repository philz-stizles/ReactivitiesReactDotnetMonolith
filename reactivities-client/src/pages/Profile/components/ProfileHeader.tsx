import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid, Item, Segment, Header, Statistic, Divider, Reveal, Button } from 'semantic-ui-react'
import { IProfile } from '../../../models/IProfile'

interface IProps {
    profile: IProfile
}

const ProfileHeader: React.FC<IProps> = ({profile}) => {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='tiny' src={profile.image || '/assets/user.png'}/>
                            <Item.Content verticalAlign='middle'><Header as='h2'>{profile.displayName}</Header></Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value={profile.followerCount} />
                        <Statistic label='Following' value={profile.followeeCount} />
                    </Statistic.Group>
                    <Divider />
                    <Reveal animated='move'>
                        <Reveal.Content visible style={{ width: '100%'}}>
                            <Button color='teal' fluid content='Following' />
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            <Button fluid basic
                                color={true ? 'red': 'green'} 
                                content={true ? 'Unfollow' : 'Folow'}/>
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default observer(ProfileHeader)
