import React, {Component} from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {MenuItem, Nav, Navbar, NavDropdown, Image} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {switchLanguage} from "../../actions/IntlActions";
import {enabledLanguages} from "../../../intl/language";


@connect(
	state => ({
		intl: state.intl
	}),
	dispatch => bindActionCreators({switchLanguage}, dispatch)
)
export default class Menu extends Component {
	static propTypes = {
		switchLanguage: PropTypes.func
	};

	onSelect(language) {
		this.props.switchLanguage(language);
	}

	renderLang() {
		return (
			<NavDropdown title={<FormattedMessage id="menu.switchLanguage" />} id="lang_menu">
				{enabledLanguages.map(language =>
					<MenuItem key={language} eventKey={language} onSelect={::this.onSelect}>
						<FormattedMessage id={`menu.language.${language}`} />
					</MenuItem>
				)}
			</NavDropdown>
		);
	}

	renderMenu() {
		return (
			<Nav navbar pullRight>
				{this.renderLang()}
			</Nav>
		);
	}

	render() {
		return (
			<Navbar inverse>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/" className="navbar-brand">
							<Image src="https://www.viomedo.de/public/img/Logo-white.svg" height="32" width="127"/>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse href="#">
					{this.renderMenu()}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
