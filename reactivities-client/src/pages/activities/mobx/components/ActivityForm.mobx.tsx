import React, { FormEvent, useContext, useEffect } from 'react'
import { useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../data/mobx/rootStore'

interface IProps {
    id: string
    history: History
}

const ActivityFormMobx: React.FC<IProps> = ({ id, history }) => {
    const { activityStore: { 
        selectedActivity, 
        loadActivity,
        createActivity, 
        editActivity, 
        clearActivity,
        closeForm,  
        isSubmitting 
    } } = useContext(RootStoreContext)
    
    useEffect(() => {
        if(id){
            loadActivity(id)
                .then(() => selectedActivity && setActivityForm(selectedActivity))
        }

        return () => clearActivity()
    }, [loadActivity, id, selectedActivity, clearActivity])

    const [activityFormState, setActivityForm] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    })

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget
        console.log(name, value)
        setActivityForm({
            ...activityFormState,
            [name]: value
        })
    }

    const handleSubmit = () => {
        console.log(activityFormState)
        if(activityFormState.id.length === 0){
            let newActivity = {
                ...activityFormState,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push('/activities'))
        } else {
            editActivity(activityFormState)
        }
    }

    return (
        <Grid>
            <Grid.Column width={16}>
                <Segment clearing>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input 
                            placeholder='Title' 
                            value={activityFormState.title} 
                            name='title' 
                            onChange={handleChange}/>
                        <Form.TextArea 
                            rows={3} 
                            placeholder='Description' 
                            value={activityFormState.description} 
                            name='description' 
                            onChange={handleChange}/>
                        <Form.Select 
                            options={[]} 
                        />
                        <Form.Input 
                            type='datetime-local' 
                            placeholder='Date'
                            value={activityFormState.date} 
                            name='date' 
                            onChange={handleChange} />
                        <Form.Input 
                            placeholder='City' 
                            value={activityFormState.city} 
                            name='city' 
                            onChange={handleChange}/>
                        <Form.Input 
                            placeholder='Venue' 
                            value={activityFormState.venue} 
                            name='venue' 
                            onChange={handleChange}/>
                        <Button loading={isSubmitting} float='right' positive type='submit' content='Submit' />
                        <Button float='right' type='button' content='Cancel' onClick={closeForm} />
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityFormMobx)