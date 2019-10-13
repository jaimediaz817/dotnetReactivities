import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from '../../../app/stores/activitiesStore';

const ActivityList: React.FC = () => {

  const activityStore = useContext(ActivityStore);
  const { activitiesByDate, selectActivity, deleteActivity, target, submitting} = activityStore;

  return (
    <Segment clearing>
      <Item.Group dividied>
        {activitiesByDate.map(activity => (
          <Item key={activity.id }>
            <Item.Image
              size="tiny"
              src="https://react.semantic-ui.com/images/wireframe/image.png"
            />
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.dscription}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="view"
                  color="blue"
                  onClick={() => selectActivity(activity.id)}
                />
                <Button
                  name={ activity.id }
                  floated="right"
                  content="Eliminar"
                  color="red"
                  onClick={(e) => deleteActivity(e, activity.id)}
                  loading={ target === activity.id && submitting }
                />                
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
