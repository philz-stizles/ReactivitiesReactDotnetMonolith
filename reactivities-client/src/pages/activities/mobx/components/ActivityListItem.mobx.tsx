import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../../../data/mobx/rootStore'
import { IActivity } from '../../../../models/IActivity'

interface IProps {
    activity: IActivity
}

const ActivityListItemMobx: React.FC<IProps> = ({ activity }) => {
    const { activityStore: { deleteActivity, isSubmitting, target } } = useContext(RootStoreContext)
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={'/assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted by Philz
                                <Link to={`/profile/`}/>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {activity.date.toDateString()}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing >
                <span>{activity.description}</span>
                <Button 
                    floated='right' 
                    content='View' 
                    color='blue'
                    as={Link}
                    to={`/activities/${activity.id}`}
                    // onClick={() => selectActivity(activity.id)} 
                ></Button>
                <Button 
                    name={activity.id}
                    loading={target === activity.id && isSubmitting}
                    floated='right' 
                    content='Delete' 
                    color='red'
                    onClick={(e) => deleteActivity(e, activity.id)} 
                ></Button>
            </Segment>
        </Segment.Group>
    )
}

export default observer(ActivityListItemMobx)
