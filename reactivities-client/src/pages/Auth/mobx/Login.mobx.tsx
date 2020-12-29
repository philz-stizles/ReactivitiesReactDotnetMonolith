import React, { useContext } from 'react'
import { Container, Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../../components/Form/TextInput';
import { RootStoreContext } from '../../../data/mobx/rootStore';
import { IUserLogin } from '../../../models/IAuth';
import { Form as FinalForm, Field } from 'react-final-form'
import FacebookLogin from 'react-facebook-login';

const LoginMobx = () => {
    const { userStore: { login, isSubmitting } } = useContext(RootStoreContext)

    const responseFacebook = (response: any) => {
        console.log(response);
    }
    
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
                        <FacebookLogin
                            appId="1088597931155576"
                            autoLoad={true}
                            fields="name,email,picture"
                            // onClick={componentClicked}
                            callback={responseFacebook} />
                    </Form>
                )}/>
        </Container>
    )
}

export default LoginMobx;
