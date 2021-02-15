const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
	connectionLimit: 10,
	host: process.env.HOST || "localhost",
	user: process.env.USER || "admin",
	password: process.env.PASSWORD || "123456789",
	database: process.env.DATABASE || "todo_app",
});

module.exports = db;
