import React, { useContext } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import ActivityStore from '../../../app/stores/activitiesStore';
import { observer } from 'mobx-react-lite';

const ActivityDetails: React.FC = () => {
  {/* https://react.semantic-ui.com/images/avatar/large/matthew.png */}

  const activityStore = useContext(ActivityStore)
  const { selectedActivity: activity, openEditForm, cancelSelectedActivity } = activityStore;

  return (
    <Card style={{ width: "100%" }}>
      <Image src= {`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <div className="">más detalles</div>
        <Card.Header>{ activity!.city }</Card.Header>
        <Card.Meta>
          <span className="date">{ activity!.title}</span>
        </Card.Meta>
        <Card.Description>{ activity!.dscription }</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button 
              basic 
              color="blue" 
              content="Editar" 
              onClick={
                ()=> openEditForm(activity!.id) 
              }                 
            />
          <Button 
              basic 
              color="grey" 
              content="Cancelar"
              onClick={
                cancelSelectedActivity
              } >                
            </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
