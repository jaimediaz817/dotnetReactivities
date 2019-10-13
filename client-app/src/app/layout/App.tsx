import React, { useContext } from "react";
import { Container } from "semantic-ui-react";
import { useEffect, Fragment } from "react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from '../stores/activitiesStore';
import { observer } from 'mobx-react-lite';

const App = () => {

	// Store:
	const activityStore = useContext(ActivityStore);

	useEffect(() => {
		activityStore.loadActionActivities();
	}, [activityStore]);

	if (activityStore.loadingInitial) return <LoadingComponent inverted={false} content='Cargando las actividades' />

	return (
		<Fragment>
			<NavBar />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard />
			</Container>
		</Fragment>
	);
};

export default observer(App);


















/*
interface IState {
  activities: IActivity[]
}

class App extends Component <{}, IState> {

  readonly state: IState = {
    activities: []
  };
  
  componentDidMount(){
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response) => {
      console.log(response.data);
      this.setState({
        activities: response.data
      })
    })
  }


  render(){

    return (
      <div className="">
        <Header as='h2'>
          <Icon name='plug' />
          <Header.Content>Uptime Guarantee</Header.Content>
        </Header>

        <List>
            { this.state.activities.map((activity) => (              
              <List.Item key={activity.id}> { activity.title } </List.Item>
            )) }        
        </List>        
                  
          <ul>

          </ul>
        
      </div>
    );
  }
}

export default App;
*/
