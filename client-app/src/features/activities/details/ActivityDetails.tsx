import React from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
    activity: IActivity;
    setSelectedActivity: (activity: IActivity | null) => void;
    setEditMode: (editMode: boolean) => void
}

const ActivityDetails: React.FC<IProps> = ({activity, setSelectedActivity, setEditMode}) => {
  {
    /* https://react.semantic-ui.com/images/avatar/large/matthew.png */
  }
  return (
    <Card style={{ width: "100%" }}>
      <Image src= {`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{ activity.city }</Card.Header>
        <Card.Meta>
          <span className="date">{ activity.title}</span>
        </Card.Meta>
        <Card.Description>{ activity.dscription }</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" content="Editar" onClick={()=> setEditMode(true) } />
          <Button basic color="grey" content="Cancelar" onClick={()=> setSelectedActivity(null) } ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
