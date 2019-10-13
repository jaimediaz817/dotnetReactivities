import React, { SyntheticEvent } from "react";
import { Header, Icon, List, Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from '../models/activity';
import { useState, useEffect, Fragment } from "react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Agent from "../api/Agent";
import { LOADIPHLPAPI } from "dns";
import LoadingComponent from "./LoadingComponent";

const App = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
		null
	);

	// Edit mode
	const [editMode, setEditMode] = useState(false);

	// Loader
	const [loading, setLoading] = useState(true);

	// Submitting
	const [submitting, setSubmitting] = useState(false);

	const [target, setTarget] = useState('');


	// Handles
	const handleSelectActivity = (id: string) => {
		setSelectedActivity(activities.filter(a => a.id === id)[0]);
		console.log("handle click:: ", id);
		setEditMode(false);
	};

	const handleOpenCreateForm = () => {
		setSelectedActivity(null);
		setEditMode(true);
	};



	// CRUD ********************************************************
	const handleCreateActivity = (activity: IActivity) => {
		setSubmitting(true);
		Agent.Activities.create(activity).then(()=> {
			setActivities([...activities, activity]);
			setSelectedActivity(activity);
			setEditMode(false);
		}).then(() => setSubmitting(false));
	}

	const handleEditActivity = (activity: IActivity) => {
		setSubmitting(true);
		Agent.Activities.update(activity).then(() => {
			setActivities([...activities.filter(a => a.id !== activity.id), activity]);
			setSelectedActivity(activity);
			setEditMode(false);
		}).then(() => setSubmitting(false));
	}

	const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) =>
	{
		setSubmitting(true);
		setTarget(event.currentTarget.name);
		Agent.Activities.delete(id).then(()=> {
			setActivities([...activities.filter(a => a.id !== id)]);
		}).then(() => setSubmitting(false));
	}
	// *************************************************************

	useEffect(() => {
		Agent.Activities.list()
			.then(response => {
				let activities: IActivity[] = [];
				// con forEeach también se puede recorrer las actividades
				response.map((act) =>{
					act.date =  act.date.split('.')[0];
					activities.push(act);
				});
				console.log(activities);
				setActivities(activities);
			}).then(()=> setLoading(false));
	}, []);

	if (loading) return <LoadingComponent inverted={false} content='Cargando las actividades' />

	return (
		<Fragment>
			<NavBar openCreateForm={handleOpenCreateForm} />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
				activities={activities}
				selectActivity={handleSelectActivity}
				selectedActivity={selectedActivity!}
				setSelectedActivity={setSelectedActivity}
				editMode={editMode}
				setEditMode={setEditMode}
				createActivity={ handleCreateActivity }
				editActivity={ handleEditActivity }
				deleteActivity={ handleDeleteActivity }
				submitting = { submitting }
				target = { target }
				/>
			</Container>
		</Fragment>
	);
};

export default App;


















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
