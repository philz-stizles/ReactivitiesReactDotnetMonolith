import React, { useContext } from 'react'
import { Form, Button, Header, Divider, Icon } from 'semantic-ui-react';
import TextInput from '../../../../components/Form/TextInput';
import { RootStoreContext } from '../../../../data/mobx/rootStore';
import { IUserLogin } from '../../../../models/IAuth';
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

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
            onSubmit={(values: IUserLogin) => login(values).catch(error => ({ }))} 
            validate={validate}
            render={({handleSubmit, submitting, invalid, pristine}) => (
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
                    <Button 
                        disabled={invalid || pristine}
                        loading={isSubmitting} color='teal' content='Login' fluid />
                    <Divider horizontal>Or</Divider>
                    <FacebookLogin
                        appId="2907980435997201"
                        autoLoad={true}
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
                                onClick={renderProps.onClick} disabled={renderProps.disabled} 
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
