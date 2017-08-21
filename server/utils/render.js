import React from "react";
import {Provider} from "react-redux";
import {StaticRouter} from "react-router";
import {renderToStaticMarkup, renderToString} from "react-dom/server";
import HTML from "../../client/HTML";
import IntlWrapper from "../../client/components/IntlWrapper";
import {localization} from "../../intl/setup";
import {enabledLanguages, defaultLanguage} from "../../intl/language";
import configs from "../configs/react";
import App from "../../client/app";
import configureStore from "../../client/store";

const config = configs[process.env.NODE_ENV];

export function render(url, store, context) {
	return renderToString(
		<Provider store={store}>
			<IntlWrapper>
				<StaticRouter location={url} context={context}>
					<App/>
				</StaticRouter>
			</IntlWrapper>
		</Provider>
	);
}

export function renderAppToString(request, response) {
	const initLocale = request.user ? request.user.language : defaultLanguage;
	const preloadedState = {
		intl: {
			locale: initLocale,
			enabledLanguages,
			...(localization[initLocale] || {})
		}
	};
	if (request.user) {
		Object.assign(preloadedState, {user: request.user.toJSON()});
	}
	if (request.oauth2) {
		Object.assign(preloadedState, {oauth2: request.oauth2});
	}

	const store = configureStore(preloadedState);

	const context = {};

	const initialMarkup = config.rendering === "server" ? render(request.url, store, context) : "";

	// context.url will contain the URL to redirect to if a <Redirect> was used
	if (context.url) {
		response.redirect(302, context.url);
	} else {
		response.status(200).send(`<!doctype html>\n${renderToStaticMarkup(
			<HTML initialMarkup={initialMarkup} initialState={store.getState()}/>
		)}`);
	}
}

export function renderFE(request, response) {
	if (config.rendering === "server") {
		renderAppToString(request, response);
	} else { // client
		response.status(200).send(render(HTML, () => "", {
			getState: () => ({})
		}));
	}
}

