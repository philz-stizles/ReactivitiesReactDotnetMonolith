import React from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button} from 'semantic-ui-react'

const Navbar = () => {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item as={NavLink} header to="/" exact>Reactivities</Menu.Item>
                <Menu.Item as={NavLink} name="About" to="/about" />
                <Menu.Item as={NavLink} name='Activities' to="/activities"/>
                <Menu.Item>
                    <Button positive content="Create Activity" />
                </Menu.Item>
                <Menu.Item as={NavLink} name="Contact" to="/contact" />
                <Menu.Item as={NavLink} name="Sign in" to="/auth" />
            </Container>
        </Menu>
    );
}

export default Navbar