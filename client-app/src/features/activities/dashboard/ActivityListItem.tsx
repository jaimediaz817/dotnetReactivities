import React, { useContext } from "react";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ActivityStore from "../../../app/stores/activitiesStore";
import { IActivity } from "../../../app/models/activity";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const activityStore = useContext(ActivityStore);

  return (
    <Segment.Group>
      <Segment>
          <Item.Group>
                  <Item>
                      <Item.Image size="tiny" circular src="/assets/user.png" />
                      <Item.Content>
                          <Item.Header as="a">{activity.title}</Item.Header>
                          <Item.Description>Alojado por Bob</Item.Description>
                      </Item.Content>
                  </Item>
          </Item.Group>

      </Segment>
      <Segment>
        <Icon name="clock" />
        {activity.date}
        <Icon name="marker" />
        {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.dscription}</span>
        <Button
          floated="right"
          content="Ver"
          color="blue"
          //onClick={() => selectActivity(activity.id)}
          as={Link}
          to={`/activities/${activity.id}`}
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
