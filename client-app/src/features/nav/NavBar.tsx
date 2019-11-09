import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

interface IProps {
    openCreateForm: ()=> void;
}

const NavBar: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { user, logout} = rootStore.userStore;
        
    return (
        <Menu inverted>
            <Container>
                <Menu.Item header as={ NavLink } to='/' exact >
                    <img src="/assets/logo.png" style={{ marginRight: "10px" }} alt='logo'/>
                    Reactivities
                </Menu.Item>

                <Menu.Item name='Activities' as={ NavLink } to='/activities' content='Ver listado (actividades)'></Menu.Item>

                <Menu.Item >
                    <Button
                        as={ NavLink } to='/createActivity'                        
                        positive
                        content='Crear actividad'
                    />
                </Menu.Item>
                {
                    user &&
                    <Menu.Item position='right'>
                        <Image avatar spaced='right' src={ user.image || '/assets/user.png'} />
                        <Dropdown pointing='top left' text={user.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user'/>
                            <Dropdown.Item onClick={ logout } text='Cerrar sesión' icon='power' />
                        </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                }
            </Container>
        </Menu>
    );
}

export default observer(NavBar);
