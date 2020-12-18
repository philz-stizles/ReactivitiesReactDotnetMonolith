import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../data/mobx/rootStore'
import LoginForm from './Auth/mobx/components/LoginForm.mobx'
import RegisterForm from './Auth/mobx/components/RegisterForm.mobx'


const Home = () => {
    const { 
        userStore: { isLoggedIn, user },
        modalStore: { openModal } 
    } = useContext(RootStoreContext)

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                {/* <Image
                    size='massive'
                    src='/assets/logo.png'
                    alt='logo'
                    style={{ marginBottom: 12 }}
                /> */}
                Reactivities
                </Header>
                {
                    isLoggedIn && user 
                    ? (<Fragment>
                        <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                        <Button as={Link} to='/activities' size='huge' inverted>Go to activities!</Button>
                    </Fragment>) 
                    : (<Fragment>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>Login</Button>
                        {/* <Button as={Link} to='/login' size='huge' inverted>Login</Button> */}
                        <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>Register</Button>
                        {/* <Button as={Link} to='/register' size='huge' inverted>Register</Button> */}
                    </Fragment>)
                }
            </Container>
        </Segment>
    )
}

export default observer(Home)