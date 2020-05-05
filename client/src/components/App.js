/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tianshi
 * @Date: 2020-05-04 08:42:41
 * @LastEditors: Tianshi
 * @LastEditTime: 2020-05-04 17:16:42
 */
import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Artist from './Artist';
import Display from './Display';
import DisplayPopular from './DisplayPopular';
import Home from './Home'
import SingleImage from './SingleImage';
import WelcomePage from './WelcomePage';
import DisplayTimeline from './DisplayTimeline';


/*** Font Awesome Icon **/
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faHotjar, faGratipay, faTwitter, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { far, faUser, faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import { faSearch, faSpinner, faHeart as fasHeart, faEnvelope, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faSearch, faSpinner, faHotjar, faGratipay, far, fasHeart, farHeart, faUser,
	faTwitter, faFacebook, faInstagram, faEnvelope, faAngleDoubleRight )


export default class App extends React.Component {

	constructor () {
		super();

		this.state = {
		  loggedInStatus: "NOT_LOGGED_IN",
		  user: ''
		};

		this.handleLogin = this.handleLogin.bind(this);
		// this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogin(data) {

		this.setState({
		  loggedInStatus: "LOGGED_IN",
		  user: data.value
		});

	}

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
						exact
						path={"/"}
						render={props => (
							<Home
							{...props}
							handleLogin={this.handleLogin}
							// handleLogout={this.handleLogout}
							user={this.state.user}
							loggedInStatus={this.state.loggedInStatus}
							/>
						)}
						/>
						<Route
						exact
						path={"/WelcomePage"}
						render={props => (
							<WelcomePage
							{...props}
							handleLogin={this.handleLogin}
							// handleLogout={this.handleLogout}
							user={this.state.user}
							loggedInStatus={this.state.loggedInStatus}
							/>
						)}
						/>

						<Route
						exact
						path={"/display/:key/:value"}
						render={props => (
							<Display
							{...props}
							user={this.state.user}
							loggedInStatus={this.state.loggedInStatus}
							/>
						)}
						/>

						<Route
						exact
						path={"/singleimage/:imageID"}
						render={props => (
							<SingleImage
							{...props}
							user={this.state.user}
							loggedInStatus={this.state.loggedInStatus}
							/>
						)}
						/>

						<Route
						exact
						path={"/artist/:firstLetter"}
						render={props => (
							<Artist
							{...props}
							user={this.state.user}
							loggedInStatus={this.state.loggedInStatus}
							/>
						)}
						/>

						<Route
							path={"/populars/:genre"}
							render={(props) => (
								<DisplayPopular
									{...props}
									user={this.state.user}
									loggedInStatus={this.state.loggedInStatus}
								/>
							)}
						/>
						<Route
							path={"/timeline"}
							render={(props) => (
								<DisplayTimeline
									{...props}
									user={this.state.user}
									loggedInStatus={this.state.loggedInStatus}
								/>
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
