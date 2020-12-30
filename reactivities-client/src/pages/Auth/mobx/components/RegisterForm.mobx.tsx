import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Container, Form, Button, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../../../data/mobx/rootStore';
import { IUserRegister } from '../../../../models/IAuth';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../../components/Form/TextInput';
import ErrorMessage from '../../../../components/ErrorMessage';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';
import { FORM_ERROR } from 'final-form';

const validate = combineValidators({
    userName: isRequired('userName'),
    displayName: isRequired('displayName'),
    email: isRequired('Email'),
    password: composeValidators(
        isRequired('Password'), 
        hasLengthGreaterThan(6)({ message: 'Password should be more than 5 characters' })
    )(),
})

const RegisterFormMobx = () => {
    const { userStore: { register, isSubmitting } } = useContext(RootStoreContext)

    return (
        <Container>
            <FinalForm 
                onSubmit={(values: IUserRegister) => register(values).catch((error) => ({
                    [FORM_ERROR]: error
                }))} 
                validate={validate}
                render={({handleSubmit, submitError,  invalid, pristine, dirtySinceLastSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <Header as='h3' content='Signup to Reactivities' color='teal' textAlign='center'/>
                        <Field placeholder='Username'  name='userName'render={TextInput}/>
                        <Field placeholder='Display Name' name='displayName'render={TextInput} />
                        <Field placeholder='Email' name='email' render={TextInput} />
                        <Field type='password' placeholder='Password' name='password' render={TextInput} />

                        {submitError && !dirtySinceLastSubmit && (
                            <ErrorMessage error={submitError} text={JSON.stringify(submitError.data.errors)} />
                        )}

                        <Button fluid color='teal' content='Register'
                            loading={isSubmitting}
                            disabled={(invalid && !dirtySinceLastSubmit) || pristine} />
                    </Form>
                )}/>
        </Container>
    )
}

export default observer(RegisterFormMobx);
