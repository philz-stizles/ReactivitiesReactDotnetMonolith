import React, { useContext } from 'react'
import { Item } from 'semantic-ui-react'
import ActivityListItem from './ActivityListItem.mobx'
import { observer } from 'mobx-react-lite'
import LoadingComponent from '../../../../components/LoadingComponent'
import { RootStoreContext } from '../../../../data/mobx/rootStore'

const ActivityListMobx = () => {
    const { activityStore: { activitiesByDate, isLoading } } = useContext(RootStoreContext)
    if(isLoading) return <LoadingComponent content="Loading activities"/>
    
    return (
        <Item.Group divided>
            { activitiesByDate.map(activity => {
                return <ActivityListItem key={activity.id} activity={activity} />
            })}
        </Item.Group>
    )
}

export default observer(ActivityListMobx)
