import React, { useContext } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { IActivity } from '../../../../models/IActivity'
import ActivityStore from '../../../../data/mobx/activityStore'
import { observer } from 'mobx-react-lite'

interface IProps {
    onSetEditMode: (editMode: boolean) => void;
    onSetActivity: (selectedActivity: IActivity | null) => void;
}

const ActivityDetailMobx: React.FC<IProps> = ({ onSetEditMode, onSetActivity }) => {
    const { selectedActivity } = useContext(ActivityStore)

    return (
        <Card fluid>
            {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
            <Card.Content>
                <Card.Header>{selectedActivity!.title}</Card.Header>
                <Card.Meta><span className='date'>{selectedActivity!.date}</span></Card.Meta>
                <Card.Description>{selectedActivity!.description}</Card.Description>
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

export default observer(ActivityDetailMobx)
