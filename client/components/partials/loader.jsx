import React, {Component} from "react";
import {Glyphicon} from "react-bootstrap";


export default class Loader extends Component {

	render() {
		return (
			<div><Glyphicon glyph="refresh" /> Loading...</div>
		);
	}

}
