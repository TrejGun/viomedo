export default function (app) {
	app.use((request, response, next) => {
		if (request.method === "OPTIONS") {
			response.status(200).send("");
			return;
		}
		next();
	});

	app.use((request, response, next) => {
		Object.assign(request, {
			params: request.params || {},
			query: request.query || {},
			body: request.body || {}
		});
		next();
	});
}
