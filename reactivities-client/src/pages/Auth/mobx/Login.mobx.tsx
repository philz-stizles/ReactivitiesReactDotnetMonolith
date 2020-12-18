import React, { useContext } from 'react'
import { Container, Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../../components/TextInput';
import { RootStoreContext } from '../../../data/mobx/rootStore';
import { IUserLogin } from '../../../models/IUser';
import { Form as FinalForm, Field } from 'react-final-form'

const LoginMobx = () => {
    const { userStore: { login, isSubmitting } } = useContext(RootStoreContext)

    return (
        <Container style={{'marginTop': '5rem'}}>
            <FinalForm 
                onSubmit={(values: IUserLogin) => login(values).catch(error => ({}))} 
                render={({handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <Header as='h2' content='Login to Reactivities'/>
                        <Field 
                            placeholder='Email' 
                            name='email'
                            render={TextInput} />
                        <Field 
                            placeholder='Password'  
                            name='password'
                            render={TextInput} />
                        <Button loading={isSubmitting} float='right' positive type='submit' content='Submit' />
                    </Form>
                )}/>
        </Container>
    )
}

export default LoginMobx;
