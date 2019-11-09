import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activitiesStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import NotFound from "../../../app/layout/NotFound";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity: activity, loadActivity, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id)
    .catch(()=> {
      history.push('/notfound');
    })
  }, [loadActivity, match.params.id, history]);

  if (!activity)  
    return <NotFound />

  if (loadingInitial || !activity)
    return <LoadingComponent content="Loading activity..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
