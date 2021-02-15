const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();
const userRoutes = require("./routes/userRoutes.js");
const listRoutes = require("./routes/listRoutes.js");
const todoRoutes = require("./routes/todoRoutes.js");
const app = express();

app.use(express.json());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET, POST, PATCH, DELETE, OPTIONS, HEAD"],
		credentials: true, //allowing cookies
	})
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		name: "user_auth",
		key: "userID",
		secret: "supersecretsecrete",
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24,
		},
	})
);

app.use((req, res, next) => {
	console.log("- - - - - - - - - -- - - - - - - - - - - - - - -- - - - - - - - -");
	console.log("New request was made");
	console.log("path: ", req.path);
	console.log("method: ", req.method);
	console.log("SESSION: ", req.session);
	console.log("Cookies: ", req.cookies);
	console.log("\n");
	next();
});

/* ROUTES */

app.use("/api/users", userRoutes);

app.use("/api/todo", todoRoutes);

app.use("/api/lists", listRoutes);

//Starting server
const PORT = 3001;
app.listen(process.env.PORT || PORT, () => console.log(`Server running on port ${PORT}`));
