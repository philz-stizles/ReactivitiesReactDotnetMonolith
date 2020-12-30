import React, { useContext } from 'react'
import { Form, Button, Header, Divider, Icon, Label } from 'semantic-ui-react';
import TextInput from '../../../../components/Form/TextInput';
import { RootStoreContext } from '../../../../data/mobx/rootStore';
import { IUserLogin } from '../../../../models/IAuth';
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { FORM_ERROR } from 'final-form';

const validate = combineValidators({
    email: isRequired('Email'),
    password: composeValidators(
        isRequired('Password'), 
        hasLengthGreaterThan(6)({ message: 'Password should be more than 5 characters' })
    )(),
})

const LoginFormMobx = () => {
    const { userStore: { login, facebookLogin, googleLogin, isSubmitting } } = useContext(RootStoreContext)

    return (
        <FinalForm 
            onSubmit={(values: IUserLogin) => login(values).catch(error => ({
                [FORM_ERROR]: error
            }))} 
            validate={validate}
            render={({handleSubmit, submitting, invalid, pristine, submitError, dirtySinceLastSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'/>
                    <Field placeholder='Email' name='email' render={TextInput} />
                    <Field type='password' placeholder='Password' name='password' render={TextInput} />
                    {submitError && <Label color='red' basic content={submitError.statusText}/>}
                    <br />
                    <Button 
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting} color='teal' content='Login' fluid />
                    <Divider horizontal>Or</Divider>
                    <FacebookLogin
                        appId="2907980435997201"
                        autoLoad={false}
                        fields="name,email,picture"
                        // onClick={componentClicked}
                        callback={facebookLogin} 
                        render={(renderProps: any) => (
                            <Button
                                type="button"
                                onClick={renderProps.onClick} 
                                loading={isSubmitting} 
                                color='blue' 
                                fluid><Icon name="facebook" />Login with Facebook</Button>
                    )}/>
                    <Divider horizontal>Or</Divider>
                    <GoogleLogin
                        clientId=""
                        render={renderProps => (
                            <Button 
                                type="button"
                                onClick={renderProps.onClick} 
                                loading={isSubmitting} 
                                disabled={renderProps.disabled} 
                                color='red' fluid><Icon name="google" />Login with Google</Button>
                        )}
                        buttonText="Login"
                        onSuccess={googleLogin}
                        onFailure={googleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </Form>
            )}/>
    )
}

export default LoginFormMobx;
