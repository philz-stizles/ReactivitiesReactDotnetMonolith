import React, { useContext } from 'react'
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../../../components/TextInput';
import { RootStoreContext } from '../../../../data/mobx/rootStore';
import { IUserLogin } from '../../../../models/IUser';
import { Form as FinalForm, Field } from 'react-final-form'

const LoginFormMobx = () => {
    const { userStore: { login, isSubmitting } } = useContext(RootStoreContext)

    return (
        <FinalForm 
            onSubmit={(values: IUserLogin) => login(values).catch(error => ({}))} 
            render={({handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'/>
                    <Field 
                        placeholder='Email' 
                        name='email'
                        render={TextInput} />
                    <Field 
                        placeholder='Password'  
                        name='password'
                        render={TextInput} />
                    <Button loading={isSubmitting} color='teal' content='Login' fluid />
                </Form>
            )}/>
    )
}

export default LoginFormMobx;
