import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { RootStoreContext } from '../../../../data/mobx/rootStore'

const ActivityDetailState = () => {
    // const { activityStore: { selectedActivity, setEditMode, closeDetail } } = useContext(RootStoreContext)
    const { activityStore: { selectedActivity } } = useContext(RootStoreContext)
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
                    {/* <Button basic color='blue' content='Edit' onClick={() => setEditMode(selectedActivity!.id)} /> */}
                    {/* <Button basic color='grey' content='Cancel' onClick={closeDetail} /> */}
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetailState)
