import React, { useContext, Fragment } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { format } from 'date-fns';

const ActivityList: React.FC = () => {

  const rootStore = useContext(RootStoreContext);
  const { activitiesByDate } = rootStore.activityStore;

  // const {
  //   activitiesByDate,
  //   deleteActivity,
  //   target,
  //   submitting
  // } = activityStore;

  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {format(group, 'eeee do MMMM')}
          </Label>
          <Item.Group dividied>
            {activities.map(activity => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);
