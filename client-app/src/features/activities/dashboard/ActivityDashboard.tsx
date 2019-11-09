import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from 'mobx-react-lite';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";


const ActivityDashboard: React.FC = () => {

	// Store:
  const rootStore = useContext(RootStoreContext);
  const { loadActionActivities, loadingInitial} = rootStore.activityStore;

	useEffect(() => {
		loadActionActivities();
	}, [loadActionActivities]);


	if (loadingInitial) 
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
