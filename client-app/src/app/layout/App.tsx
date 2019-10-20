import React from "react";
import { Container } from "semantic-ui-react";
import { Fragment } from "react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, withRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import { RouteComponentProps } from "react-router";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));

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
