import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../data/mobx/rootStore'
import DateInput from '../../../../components/Form/DateInput'
import TextInput from '../../../../components/Form/TextInput'
import { ActivityFormValues, IActivityFormValues } from '../../../../models/IActivity'
import TextAreaInput from '../../../../components/Form/TextAreaInput'
import SelectInput from '../../../../components/Form/SelectInput'
import { combineDateAndTime } from '../../../../helpers/util'
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate'

const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    description: composeValidators(
        isRequired('Description'), 
        hasLengthGreaterThan(4)({ message: 'Description needs to be atleast 5 characters' })
    )(),
    category: isRequired('Category'),
    date: isRequired('Date'),
    time: isRequired('Time'),
    venue: isRequired('Venue'),
    city: isRequired('City')
})

interface IProps {
    id: string
    onRedirectTo: (location: string) => void
}

const ActivityFormMobx: React.FC<IProps> = ({ id, onRedirectTo }) => {
    const { activityStore: { 
        loadActivity,
        createActivity, 
        editActivity,
        isSubmitting 
    } } = useContext(RootStoreContext)
    
    useEffect(() => {
        console.log('useeffect - activityform')
        if(id){
            loadActivity(id)
                .then((activity) => setActivityForm(new ActivityFormValues(activity)))
        }
    }, [loadActivity, id])

    const [isLoading, setIsLoading] = useState(false)
    const [activityFormState, setActivityForm] = useState<IActivityFormValues>(new ActivityFormValues())

    const handleFinalFormSubmit = (values: any) => {
        console.log(values)
        const { date, time, ...activity } = values
        const dateTime = combineDateAndTime(date, time)
        activity.date = dateTime
        console.log(activity)
        if(!activityFormState.id){
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => onRedirectTo('/activities'))
        } else {
            editActivity(activity).then(() => onRedirectTo(`/activities/${activity.id}`))
        }
    }

    return (
        <Grid>
            <Grid.Column width={16}>
                <Segment clearing>
                <FinalForm 
                    initialValues={activityFormState}
                    validate={validate}
                    onSubmit={handleFinalFormSubmit} 
                    render={({handleSubmit, invalid, pristine}) => (
                        <Form onSubmit={handleSubmit} loading={isLoading}>
                            <Field 
                                placeholder='Title' 
                                name='title'
                                value={activityFormState.title}
                                render={TextInput} />
                            <Field 
                                rows={3}
                                placeholder='Description' 
                                name='description'
                                value={activityFormState.description}
                                render={TextAreaInput} />
                            <Field 
                                placeholder='Category' 
                                name='category'
                                options={[{key: 'drinks', text: 'Drinks', value: 'drinks'}]}
                                value={activityFormState.category}
                                render={SelectInput} />
                            <Form.Group widths='equal'>
                                <Field 
                                    date={true}
                                    placeholder='Date'  
                                    name='date'
                                    value={activityFormState.date}
                                    render={DateInput} />
                                <Field 
                                    time={true}
                                    placeholder='Time'  
                                    name='time'
                                    value={activityFormState.time}
                                    render={DateInput} />
                            </Form.Group>
                            <Field 
                                placeholder='Venue' 
                                name='venue'
                                value={activityFormState.venue}
                                render={TextInput} />
                            <Field 
                                placeholder='City' 
                                name='city'
                                value={activityFormState.city}
                                render={TextInput} />
                            <Button 
                                type='submit' 
                                loading={isSubmitting} 
                                positive 
                                content='Submit' 
                                floated='right'
                                disabled={isLoading || invalid || pristine} />
                            <Button 
                                type='button' 
                                onClick={() => onRedirectTo('/activities')} 
                                disabled={isLoading}
                                content='Cancel' 
                                floated='right' />
                        </Form>
                    )}/>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityFormMobx)
