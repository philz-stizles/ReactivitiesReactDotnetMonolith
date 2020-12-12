import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../../../data/mobx/rootStore'
import { IActivity } from '../../../../models/IActivity'

interface IProps {
    activity: IActivity
}

const ActivityListItemMobx: React.FC<IProps> = ({ activity }) => {
    const { activityStore: { selectActivity, deleteActivity, isSubmitting, target } } = useContext(RootStoreContext)
    return (
        <Segment.Group>
            <Segment>
                <Item>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                    </Item.Content>
                </Item>
            </Segment>
            <Segment>
                <Icon name='clock' /> {activity.date}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                
            </Segment>
            <Segment clearing >
                <span>{activity.description}</span>
                <Button 
                    floated='right' 
                    content='View' 
                    color='blue'
                    onClick={() => selectActivity(activity.id)} 
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
