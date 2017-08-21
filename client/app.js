import React, {Component} from "react";
import {Grid} from "react-bootstrap";
import {Switch, Route} from "react-router";
import Menu from "./components/partials/menu";

import Landing from "./components/landing/index";
import ApplicationForm from "./components/application/form";
import ApplicationSuccess from "./components/application/success";
import NotFound from "./components/notfound/index";


export default class App extends Component {
	render() {
		console.log("App:render");
		return (
			<div>
				<Menu />
				<Grid>
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/application/form" component={ApplicationForm} />
						<Route exact path="/application/success" component={ApplicationSuccess} />

						<Route component={NotFound} />
					</Switch>
				</Grid>
			</div>
		);
	}
}
