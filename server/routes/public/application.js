import {wrapJSON} from "../../utils/wrapper";
import {methodNotAllowed} from "../../utils/middleware";

import ApplicationController from "../../controllers/impl/application";


export default function (router) {
	const applicationController = new ApplicationController();

	router.route("/applications")
		.post(wrapJSON(::applicationController.insert))
		.all(methodNotAllowed);
}
