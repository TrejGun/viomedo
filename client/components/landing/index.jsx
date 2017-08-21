import React, {Component} from "react";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";


export default class Landing extends Component {
	render() {
		return (
			<div>
				<Link to="/application/form">
					<FormattedMessage id="text.form" />
				</Link>
			</div>
		);
	}
}
