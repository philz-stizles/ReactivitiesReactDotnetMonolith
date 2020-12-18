import React, {  } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import ActivityFormMobx from './components/ActivityForm.mobx'

interface DetailParams {
    id: string
}

const ActivityEditMobx: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {


    return (
        <ActivityFormMobx id={match.params.id} history={history} />
    )
}

export default observer(ActivityEditMobx)