export default function (app) {
	const headers = [
		"Accept",
		"Cache-Control",
		"Content-Type",
		"Idempotency-Key",
		"If-Modified-Since",
		"Origin",
		"Pragma",
		"X-XSRF-TOKEN"
	];

	app.use((request, response, next) => {
		// TODO fonts are not loading because requested from css file
		response.set("Access-Control-Allow-Origin", request.get("Origin")); // don't use "*"
		response.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
		response.set("Access-Control-Allow-Credentials", true);
		response.set("Access-Control-Allow-Headers", headers.join(","));
		response.set("Access-Control-Max-Age", 1000);
		next();
	});
}
