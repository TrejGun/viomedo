import {pick, omit} from "lodash";
import {checkModel} from "../utils/middleware";
import {getConnection} from "../../init/sequelize";


export const fieldsToOmit = ["id", "createdAt", "updatedAt", "deletedAt"];

export default class AbstractController {

	static param = "id";

	constructor() {
		this.constructor.displayName = this.constructor.name.slice(0, -10);
		this.model = getConnection().models[this.constructor.displayName.toLowerCase()];
		this.model.sync();
	}

	insert(request, fieldsToPick = [], data = {}) {
		// don't remove id it causes recursion and `Maximum call stack size exceeded` error
		const clean = fieldsToPick.length ? pick(request.body, fieldsToPick) : omit(request.body, fieldsToOmit);
		Object.assign(clean, data);
		console.log("clean", clean)
		return this.create(clean);
	}

	edit(request) {
		return this.change(request);
	}

	list(request) {
		const {limit, offset} = request.query;
		return this.findAll({where: {}, limit, offset})
			.then(list => ({list}));
	}

	change(request, options = {}, conditions = [], fieldsToPick = [], data = {}) {
		Object.assign(options, {raw: false});
		return this.getByUId(request, options, conditions)
			.then(item => {
				const clean = fieldsToPick.length ? pick(request.body, fieldsToPick) : omit(request.body, fieldsToOmit);
				if (Object.keys(clean).length || Object.keys(data).length) {
					Object.assign(item, clean, data);
					return this.save(item);
				} else {
					return item;
				}
			});
	}

	save(item) {
		return item.save();
	}

	getByUId(request, options = {}, conditions) {
		return this.find({
			where: {
				[this.constructor.param]: request.params[this.constructor.param] || request.body[this.constructor.param] || request.query[this.constructor.param]
			},
			...options
		})
			.tap(model => checkModel().bind(this)(model, request));
	}

	getById(request) {
		return this.getByUId(request);
	}

	deactivate(request) {
		return this.getByUId(request)
			.tap(model =>
				this.destroy({
					where: {
						[this.constructor.param]: request.params[this.constructor.param] || request.body[this.constructor.param] || request.query[this.constructor.param]
					}
				})
			);
	}

	delete(request) {
		return this.deactivate(request);
	}
}
; // eslint-disable-line no-extra-semi


[
	"create",
	"bulkCreate",
	"find",
	"findAll",
	"aggregate",
	"sync",
	"count",
	"destroy"
].forEach(name => {
	AbstractController.prototype[name] = function wrapper(...args) {
		return this.model[name](...args);
	};
});

