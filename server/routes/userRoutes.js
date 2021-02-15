const express = require("express");
const db = require("../db");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const saltRounds = 10;

//Create new user
router.post(
	"/register",
	[
		check("userName")
			.exists()
			.notEmpty()
			.withMessage("Username cannot be empty.")
			.isAlpha()
			.withMessage("Only A-Z letters and numbers allowed for username.")
			.isLength({ min: 3, max: 40 })
			.withMessage("Username has to have 3 - 40 characters."),
		check("userPassword")
			.exists()
			.withMessage("Cannot start with space.")
			.notEmpty()
			.withMessage("Password cannot be empty.")
			.isLength({ min: 3, max: 60 })
			.withMessage("Password has to have 3 - 60 characters.")
			.escape(),
	],
	(req, res) => {
		const valErr = validationResult(req);
		if (!valErr.isEmpty()) {
			return res.send(valErr);
		}
		const name = req.body.userName;
		const password = req.body.userPassword;
		const sql = "SELECT name FROM users WHERE name = ?";
		const sql2 = "INSERT INTO users (name, password) VALUES (?, ?)";
		db.query(sql, name, (err, result) => {
			if (err) throw err;
			if (result.length > 0) {
				res.send({ errors: [{ msg: "User already exists" }] });
			} else {
				bcrypt.hash(password, saltRounds, (err, hash) => {
					if (err) throw err;
					db.query(sql2, [name, hash], (err, result) => {
						if (err) throw err;
						res.send({ errors: [{ msg: "User registered" }] });
					});
				});
			}
		});
	}
);

//Login user
router.post(
	"/login",
	[
		check("userName").exists().notEmpty().withMessage("Username is empty.").isAlpha().isLength({ min: 3, max: 40 }),
		check("userPassword").exists().notEmpty().withMessage("Password is empty.").isLength({ min: 3, max: 60 }).escape(),
	],
	(req, res) => {
		const valErr = validationResult(req);
		if (!valErr.isEmpty()) {
			console.log(valErr);
			return res.send(valErr);
		}
		const name = req.body.userName;
		const password = req.body.userPassword;
		const sql = "SELECT * FROM users WHERE name = ?";
		db.query(sql, name, (err, result) => {
			if (err) throw err;
			if (!result.length > 0) {
				res.send({ errors: [{ msg: "User doesn't exist" }] });
			} else {
				//compare hashed password from front end with hashed password from DB
				bcrypt.compare(password, result[0].password, (error, match) => {
					if (error) throw error;
					//if passwords match send -> create session and send user data
					if (match) {
						req.session.user_auth = result[0];
						res.send({ user_id: result[0].user_id, name: result[0].name });
					} else {
						res.send({ errors: [{ msg: "Wrong username or password" }] });
					}
				});
			}
		});
	}
);

//Checking if user is logged in and if so, sending user's data to front-end in session
router.get("/login", (req, res) => {
	if (req.session.user_auth) {
		res.send({ loggedIn: true, user: req.session.user_auth });
	} else {
		res.send({ loggedIn: false });
	}
});

router.post("/logout", (req, res) => {
	if (req.session.user_auth) {
		console.log("IMMA HERE MUTHAFUCKA");
		req.session.destroy((err) => {
			if (err) {
				return next(err);
			} else {
				res.send({ loggedIn: false });
			}
		});
	}
});

module.exports = router;
