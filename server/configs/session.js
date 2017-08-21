export default {
	[process.env.NODE_ENV]: {
		proxy: false,
		secret: "keyboard_cat",
		saveUninitialized: true,
		resave: false,
		rolling: true,
		name: "waylo.id",
		cookie: {
			path: "/",
			httpOnly: true,
			secure: false,
			maxAge: 24 * 60 * 60 * 1000,
			signed: false
		}
	}
};
