import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Container, Form, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../../../data/mobx/rootStore';
import { IUserRegister } from '../../../../models/IAuth';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../../components/Form/TextInput';
import ErrorMessage from '../../../../components/ErrorMessage';

const RegisterFormMobx = () => {
    const { userStore: { register, isSubmitting } } = useContext(RootStoreContext)

    return (
        <Container>
            <FinalForm 
                onSubmit={(values: IUserRegister) => register(values).catch(() => ({}))} 
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
                        {/* {submitError && !dirtySinceLastSubmit && (
                            <ErrorMessage error={submitError} text={JSON.stringify(submitError.data.errors)} />
                        )} */}
                        <Button loading={isSubmitting} fluid color='teal' type='Register' content='Submit' />
                    </Form>
                )}/>
        </Container>
    )
}

export default observer(RegisterFormMobx);
