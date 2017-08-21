import React, {Component} from "react";
import PropTypes from "prop-types";
import validator from "validator";
import {Button, ButtonToolbar, Form} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import withStore from "../forms/withStore";
import withFormHelper from "../forms/withFormHelper";
import InputGroupValidation from "../inputs/input.group.validation";
import CheckboxGroupValidation from "../inputs/checkbox.group.validation";
import {VALIDATION_ADD} from "../../actions/constants";


@withStore("validations")
@withFormHelper("applications")
export default class ApplicationForm extends Component {
	static propTypes = {
		gender: PropTypes.string,
		firstname: PropTypes.string,
		lastname: PropTypes.string,
		email: PropTypes.string,
		phone: PropTypes.string,
		age: PropTypes.number,
		zip: PropTypes.string,
		termsAccepted: PropTypes.bool,

		onSubmit: PropTypes.func,
		onChange: PropTypes.func,
		dispatch: PropTypes.func,

		storeName: PropTypes.string,
		history: PropTypes.object,
		validations: PropTypes.array
	};

	componentWillReceiveProps(nextProps) {
		if (!nextProps[this.props.storeName].isLoading && nextProps[this.props.storeName].success && nextProps[this.props.storeName].name === "create") {
			this.props.history.push("/application/success");
			return;
		}

		const {firstname, lastname, email, age, zip} = nextProps;

		const {dispatch, validations} = nextProps;

		if (firstname && !validations.find(v => v.name === "firstname")) {
			if (!validator.isAlpha(firstname)) {
				dispatch({
					type: VALIDATION_ADD,
					data: {
						name: "firstname",
						reason: "isAlpha"
					}
				});
			}
		}

		if (lastname && !validations.find(v => v.name === "lastname")) {
			if (!validator.isAlpha(lastname)) {
				dispatch({
					type: VALIDATION_ADD,
					data: {
						name: "lastname",
						reason: "isAlpha"
					}
				});
			}
		}

		if (age && !validations.find(v => v.name === "age")) {
			if (age < 1) {
				dispatch({
					type: VALIDATION_ADD,
					data: {
						name: "age",
						reason: "min"
					}
				});
			}
			if (age > 99) {
				dispatch({
					type: VALIDATION_ADD,
					data: {
						name: "age",
						reason: "max"
					}
				});
			}
		}

		if (zip && !validations.find(v => v.name === "zip")) {
			if (!validator.isNumeric(zip)) {
				dispatch({
					type: VALIDATION_ADD,
					data: {
						name: "zip",
						reason: "isNumeric"
					}
				});
			}
			if (!validator.isLength(zip, {min: 3, max: 5})) {
				dispatch({
					type: VALIDATION_ADD,
					data: {
						name: "zip",
						reason: "len"
					}
				});
			}
		}

		if (email && !validations.find(v => v.name === "email")) {
			if (!validator.isEmail(email)) {
				dispatch({
					type: VALIDATION_ADD,
					data: {
						name: "email",
						reason: "isEmail"
					}
				});
			}
		}
	}

	isValid() {
		return !this.props.validations.length &&
			this.props.gender &&
			this.props.firstname &&
			this.props.lastname &&
			this.props.email &&
			this.props.phone &&
			this.props.age &&
			this.props.zip &&
			this.props.termsAccepted;
	}

	render() {
		return (
			<Form horizontal onSubmit={this.props.onSubmit} name="create" action="/applications" method="POST">
				<InputGroupValidation
					name="gender"
					componentClass="select"
					defaultValue={this.props.gender}
					onChange={this.props.onChange}
					required
				>
					<option value="">Select...</option>
					{["male", "female"].map(i =>
						(<FormattedMessage key={`gender_${i}`} id={`gender.${i}`}>
							{formattedMessage => <option key={`gender_${i}`} value={i}>{formattedMessage}</option>}
						</FormattedMessage>)
					)}
				</InputGroupValidation>
				<InputGroupValidation
					name="firstname"
					defaultValue={this.props.firstname}
					placeholder={"Trej"}
					onChange={this.props.onChange}
					required
				/>
				<InputGroupValidation
					name="lastname"
					defaultValue={this.props.lastname}
					placeholder={"Gun"}
					onChange={this.props.onChange}
					required
				/>
				<InputGroupValidation
					type="email"
					name="email"
					defaultValue={this.props.email}
					placeholder={"me@gmail.com"}
					onChange={this.props.onChange}
					required
				/>
				<InputGroupValidation
					name="phone"
					defaultValue={this.props.phone}
					placeholder={"+38 (067) 868 21 83"}
					onChange={this.props.onChange}
					required
				/>
				<InputGroupValidation
					type="number"
					name="age"
					defaultValue={this.props.age}
					onChange={this.props.onChange}
					required
				/>
				<InputGroupValidation
					name="zip"
					defaultValue={this.props.zip}
					placeholder={"00000"}
					onChange={this.props.onChange}
					required
				/>
				<CheckboxGroupValidation
					name="termsAccepted"
					defaultChecked={this.props.termsAccepted}
					onChange={this.props.onChange}
					required
				/>
				<ButtonToolbar>
					<Button type="submit" className="pull-right" disabled={!this.isValid()}>
						<FormattedMessage id="form.buttons.send" />
					</Button>
				</ButtonToolbar>
			</Form>
		);
	}
}
