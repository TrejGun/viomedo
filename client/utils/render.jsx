import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import IntlWrapper from "../components/IntlWrapper";


export default (App, store) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<IntlWrapper>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</IntlWrapper>
			</Provider>
		</AppContainer>,
		document.getElementById("app")
	);
};
