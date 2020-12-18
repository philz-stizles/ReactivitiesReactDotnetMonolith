import React from 'react'
import { List, Segment, Image } from 'semantic-ui-react'
import { IAttendee } from '../../../../models/IAttendee'

interface IProps {
    attendees: IAttendee[]
    onActivitySelected: (id: string) => void
}

const ActivityAttendeeListMobx: React.FC<IProps> = ({ attendees, onActivitySelected}) => {
    return (
        <Segment> 
            <List horizontal>
                {attendees.map(attendee => {
                    return (
                        <List.Item key={attendee.id}>
                            <Image size='mini' circular src={''} />
                        </List.Item>
                    )
                })}
            </List>
        </Segment>
    )
}

export default ActivityAttendeeListMobx
