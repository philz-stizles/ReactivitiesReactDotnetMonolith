import React, { FormEvent, useContext } from 'react'
import { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../data/mobx/rootStore'

const ActivityFormMobx = () => {
    const { activityStore: { 
        selectedActivity: activity, 
        createActivity, 
        editActivity, 
        closeForm, 
        isSubmitting 
    } } = useContext(RootStoreContext)
    
    const [activityFormState, setActivityForm] = useState((activity) ? activity : {
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
        setActivityForm({
            ...activityFormState,
            [name]: value
        })
    }

    const handleSubmit = () => {
        if(activityFormState.id.length === 0){
            let newActivity = {
                ...activityFormState,
                id: uuid()
            }
            createActivity(newActivity)
        } else {
            editActivity(activityFormState)
        }
    }

    return (
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
    )
}

export default observer(ActivityFormMobx)