import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

interface IProps {
    openCreateForm: ()=> void;
}

const NavBar: React.FC = () => {
        
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
            </Container>
        </Menu>
    );
}

export default observer(NavBar);
