import {compose, createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import rootReducer from "./reducers/index";


export default function (initialState = {}) {
	const middlewares = [thunkMiddleware];

	let composeEnhancers = compose;

	if (process.env.NODE_ENV === "development" && !process.env.PORT) {
		middlewares.push(createLogger());
	}

	if (process.env.NODE_ENV === "development") {
		if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
			composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
		}
	}

	const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("./reducers", () => {
			// https://github.com/jauco/webpack-hot-module-reload-with-context-example
			const nextRootReducer = require("./reducers/index").default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
