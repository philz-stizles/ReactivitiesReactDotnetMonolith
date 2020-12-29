import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Menu, Container, Button, Dropdown, Image} from 'semantic-ui-react'
import { RootStoreContext } from '../data/mobx/rootStore';

const Navbar = () => {
    const { userStore: { isLoggedIn, user, logout } } = useContext(RootStoreContext)
    
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item as={NavLink} header to="/" exact>Reactivities</Menu.Item>
                <Menu.Item as={NavLink} name="About" to="/about" />
                <Menu.Item as={NavLink} name='Activities' to="/activities"/>
                <Menu.Item>
                    <Button as={Link} to={`/createActivity`} positive content="Create Activity" />
                </Menu.Item>
                {
                    isLoggedIn && user && (
                        <Menu.Item position='right'>
                            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                            <Dropdown pointing='top left' text={user.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                as={Link}
                                to={`/profile/${user.userName}`}
                                text='My profile'
                                icon='user'
                                />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    )
                }
            </Container>
        </Menu>
    );
}

export default observer(Navbar)