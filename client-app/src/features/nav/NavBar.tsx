import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activitiesStore';
import { observer } from 'mobx-react-lite';

interface IProps {
    openCreateForm: ()=> void;
}

const NavBar: React.FC = () => {

    // definiendo el store
    const activityStore = useContext(ActivityStore);

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
                    <Button 
                        onClick={ activityStore.openCreateForm } 
                        positive 
                        content="Crear actividad"
                    />
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default observer(NavBar);
