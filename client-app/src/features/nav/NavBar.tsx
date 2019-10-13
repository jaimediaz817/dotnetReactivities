import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react'


interface IProps {
    openCreateForm: ()=> void;
}

const NavBar: React.FC<IProps> = ({openCreateForm}) => {
    return (
        <Menu inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" style={{ marginRight: "10px" }}/>
                    Reactivities
                </Menu.Item>

                <Menu.Item
                    name='Activities'
                />
                <Menu.Item>
                    <Button onClick={ openCreateForm } positive content="Crear actividad"/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default NavBar;
