import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from "../user/RegisterForm";

const HomePage = () => {

	// TODO: STORE
	const rootStore = useContext(RootStoreContext);
	const { isLoggedIn, user} = rootStore.userStore;

	// TODO: MODAL
	const { openModal } = rootStore.modalStore;

	// TODO: remove:
	/* - quitamos la siguiente linea :
		as={Link} to="/register"
	*/

	return (
		<Segment inverted textAlign="center" vertical className="masthead">
			<Container text>
				<Header as="h1" inverted>
					<Image
						size="massive"
						src="/assets/logo.png"
						alt="logo"
						style={{ marginBottom: 12 }}
					/>
					Reactivities
				</Header>

				{ isLoggedIn && user ? (
					<Fragment>
						<Header as="h2" inverted content={`Welcome back  ${user.displayName}`} />
						<Button as={Link} to="/activities" size="huge" inverted>
							Ir a las actividades
						</Button>          
					</Fragment>
				) : (
					<Fragment>
						<Header as="h2" inverted content={`Bienvenido a las actividades`} />
						<Button onClick={ ()=> openModal(<LoginForm />) } size="huge" inverted>
							Login
						</Button>  						
						<Button onClick={ ()=> openModal(<RegisterForm />)} size="huge" inverted>
							Registrarse
						</Button> 						
					</Fragment>
				)}
			</Container>
		</Segment>
	);
};

export default HomePage;
