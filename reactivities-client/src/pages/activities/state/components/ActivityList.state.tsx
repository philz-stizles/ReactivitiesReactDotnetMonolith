import React from 'react'
import { Item, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../../models/IActivity'
import ActivityListItem from './ActivityListItem.state'

interface IProps {
    activities: IActivity[]
    onActivitySelect: (id: string) => void
    onActivityDelete: (id: string) => void
    isSubmitting: boolean
}

const ActivityListState: React.FC<IProps> = ({ activities, onActivitySelect, onActivityDelete, isSubmitting }) => {
    return (
        <Item.Group divided>
            {activities.map(activity => {
                return <ActivityListItem 
                    key={activity.id} 
                    activity={activity} 
                    onActivitySelect={onActivitySelect}
                    onActivityDelete={onActivityDelete} 
                    isSubmitting={isSubmitting}/>
            })}
        </Item.Group>
    )
}

export default ActivityListState
