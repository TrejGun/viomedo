import React, {Component} from "react";
import PropTypes from "prop-types";


export default class HTML extends Component {

	static propTypes = {
		initialMarkup: PropTypes.string,
		initialState: PropTypes.object
	};

	renderScripts() {
		if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
			return (
				<div>
					<script src="https://unpkg.com/jquery@3.1.1/dist/jquery.min.js" type="text/javascript" crossOrigin="anonymous"></script>
					<script src="https://unpkg.com/lodash@4.17.2/lodash.min.js" type="text/javascript" crossOrigin="anonymous"></script>
					<script src="https://unpkg.com/react@15.4.0/dist/react.min.js" type="text/javascript" crossOrigin="anonymous"></script>
					<script src="https://unpkg.com/react-dom@15.4.0/dist/react-dom.min.js" type="text/javascript" crossOrigin="anonymous"></script>
					{/*
					<script src="https://unpkg.com/redux@3.6.0/dist/redux.min.js" type="text/javascript"></script>
					<script src="https://unpkg.com/redux-thunk@2.1.0/dist/redux-thunk.min.js" type="text/javascript"></script>
					<script src="https://unpkg.com/redux-logger@2.7.4/dist/index.min.js" type="text/javascript"></script>
					<script src="https://unpkg.com/moment@2.17.1/min/moment.min.js" type="text/javascript"></script>
					<script src="https://unpkg.com/react-bootstrap@0.30.7/dist/react-bootstrap.min.js" type="text/javascript"></script>
					<script src="https://unpkg.com/react-intl@2.1.5/dist/react-intl.min.js" type="text/javascript"></script>
					<script src="https://unpkg.com/intl@1.2.5/dist/Intl.min.js" type="text/javascript"></script>
					*/}
				</div>
			);
		} else {
			return null;
		}
	}

	render() {
		return (
			<html>
				<head>
					<meta charSet="utf-8"/>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
					<meta name="description" content="description"/>
					<meta name="keywords" content="keywords"/>
					<meta name="robots" content="all"/>
					<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
					<link rel="shortcut icon" href={"/favicon.ico"}/>
					<link href={`/bundle/client.css`} rel="stylesheet"/>
					<title>Viomedo</title>
				</head>
				<body>
					<div id="app" dangerouslySetInnerHTML={{__html: this.props.initialMarkup}}></div>
					<script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`}}></script>
					{this.renderScripts()}
					<script src={"/bundle/vendor.js"} type="text/javascript"></script>
					<script src={`/bundle/client.js`} type="text/javascript"></script>
				</body>
			</html>
		);
	}
}
