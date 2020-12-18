import React, { useContext } from 'react'
import { Item, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../../models/IActivity'
import ActivityStore from '../../../../data/mobx/activityStore'
import ActivityListItem from './ActivityListItem.mobx'

interface IProps {
    onActivitySelect: (id: string) => void
    onActivityDelete: (id: string) => void
    isSubmitting: boolean
}

const ActivityListMobx: React.FC<IProps> = ({ onActivitySelect, onActivityDelete, isSubmitting }) => {
    const activityStore = useContext(ActivityStore)

    return (
        <Item.Group divided>
            {activityStore.activities.map(activity => {
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

export default ActivityListMobx
