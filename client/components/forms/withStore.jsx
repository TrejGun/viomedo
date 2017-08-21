import React, {Component} from "react";
import {connect} from "react-redux";


export default function withStore(storeName, paramName = "id") {
	return WrappedComponent => {
		@connect(
			state => ({
				[storeName]: state[storeName]
			})
		)
		class ComponentToStore extends Component {
			render() {
				return (<WrappedComponent
					{...this.props}
					storeName={storeName}
					paramName={paramName}
				/>);
			}
		}

		return ComponentToStore;
	};
}
