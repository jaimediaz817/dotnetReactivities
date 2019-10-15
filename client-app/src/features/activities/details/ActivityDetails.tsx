import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from '../../../app/stores/activitiesStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from "react-router";
import { useEffect } from 'react';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";


interface DetailParams {
  id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {

  const activityStore = useContext(ActivityStore)
  const { activity: activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
      loadActivity(match.params.id)
  }, [loadActivity, match.params.id])

  
  if (loadingInitial || !activity) return <LoadingComponent content='Loading activity...' />
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
              as={ Link } to={`/manage/${activity.id}`}
            />
          <Button 
              basic 
              color="grey" 
              content="Cancelar"
              onClick={
                ()=> {
                  history.push('/activities')
                }
              } >                
            </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
