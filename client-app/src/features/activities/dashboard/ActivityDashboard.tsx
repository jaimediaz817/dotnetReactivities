import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activitiesStore';
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard: React.FC = () => {

	// Store:
	const activityStore = useContext(ActivityStore);

	useEffect(() => {
		activityStore.loadActionActivities();
	}, [activityStore]);

	if (activityStore.loadingInitial) 
	    return <LoadingComponent inverted={false} content='Cargando las actividades' />  

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>

      <Grid.Column width={6}>
        <h2>Filtros de actividad</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
