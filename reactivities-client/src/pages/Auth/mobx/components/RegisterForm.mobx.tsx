import { observer } from 'mobx-react-lite';
import React, { FormEvent, useContext, useState } from 'react'
import { Container, Form, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../../../data/mobx/rootStore';
import { IUserRegister } from '../../../../models/IUser';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../../components/TextInput';

const RegisterFormMobx = () => {
    const { userStore: { register, isSubmitting } } = useContext(RootStoreContext)

    return (
        <Container>
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
                        <Button loading={isSubmitting} fluid color='teal' type='submit' content='Submit' />
                    </Form>
                )}/>
        </Container>
    )
}

export default observer(RegisterFormMobx);