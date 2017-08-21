import {renderAppToString} from "../utils/render";

export default function (app) {
	app.use(renderAppToString);
}
