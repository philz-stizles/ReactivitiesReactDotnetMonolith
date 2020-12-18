import React from 'react'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../../models/IActivity'

interface IProps {
    activity: IActivity
    onActivitySelect: (id: string) => void;
    onActivityDelete: (id: string) => void;
    isSubmitting: boolean
}

const ActivityListItemState: React.FC<IProps> = ({ activity, onActivitySelect, onActivityDelete, isSubmitting }) => {
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
                    onClick={() => onActivitySelect(activity.id)} 
                ></Button>
                <Button 
                    loading={isSubmitting}
                    floated='right' 
                    content='Delete' 
                    color='red'
                    onClick={() => onActivityDelete(activity.id)} 
                ></Button>
            </Segment>
        </Segment.Group>
    )
}

export default ActivityListItemState
