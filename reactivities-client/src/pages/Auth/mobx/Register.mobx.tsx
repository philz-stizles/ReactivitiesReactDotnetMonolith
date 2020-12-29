import { observer } from 'mobx-react-lite';
import React, { FormEvent, useContext, useState } from 'react'
import { Container, Form, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../../data/mobx/rootStore';
import { IUserRegister } from '../../../models/IAuth';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../components/Form/TextInput';

const RegisterMobx = () => {
    const { userStore: { register, isSubmitting } } = useContext(RootStoreContext)

    return (
        <Container style={{'marginTop': '5rem'}}>
            <FinalForm 
                onSubmit={(values: IUserRegister) => register(values).catch(error => ({}))} 
                render={({handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <Field 
                            placeholder='Username'  
                            name='userName'
                            render={TextInput}/>
                        <Field 
                            placeholder='Display Name' 
                            name='displayName'
                            render={TextInput} />
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

export default observer(RegisterMobx);
