import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { IActivity } from '../../../models/IActivity'

interface IProps {
    selectedActivity: IActivity
    onSetEditMode: (editMode: boolean) => void;
    onSetActivity: (selectedActivity: IActivity | null) => void;
}

const ActivityDetailState: React.FC<IProps> = ({ selectedActivity, onSetEditMode, onSetActivity }) => {
    return (
        <Card fluid>
            {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
            <Card.Content>
                <Card.Header>{selectedActivity?.title}</Card.Header>
                <Card.Meta><span className='date'>{selectedActivity.date}</span></Card.Meta>
                <Card.Description>{selectedActivity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group width={2}>
                    <Button basic color='blue' content='Edit' onClick={() => onSetEditMode(true)} />
                    <Button basic color='grey' content='Cancel' onClick={() => onSetActivity(null)} />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetailState
