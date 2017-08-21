import React, {Component} from "react";
import {Alert} from "react-bootstrap";
import {FormattedMessage} from "react-intl";


export default class ApplicationSuccess extends Component {
	render() {
		return (
			<div>
				<Alert bsStyle="success">
					<FormattedMessage id="alert.success" />
				</Alert>
			</div>
		);
	}
}
