const express = require("express");
const db = require("../db");
const { check, validationResult } = require("express-validator");

let router = express.Router();

router.post(
	"/createList",
	[
		check("userId").notEmpty().isNumeric(),
		check("list")
			.trim()
			.notEmpty()
			.matches(/^[a-z0-9 ]+$/i)
			.withMessage("Only A-Z letters and numbers allowed")
			.isLength({ min: 1, max: 45 })
			.withMessage("Must be atleast 1 character long"),
	],
	(req, res) => {
		const valErr = validationResult(req);
		if (!valErr.isEmpty()) {
			return res.send(valErr);
		}
		const user_id = req.body.userId;
		const list = req.body.list;
		const sql = "INSERT INTO lists (user_id, name) VALUES (?, ?) ";
		db.query(sql, [user_id, list], (err, result) => {
			if (err) throw err;
			res.send({ message: "New list created" });
		});
	}
);

router.delete(
	"/deleteList",
	[check("list_id").isNumeric().notEmpty(), check("user_id").isNumeric().notEmpty()],
	(req, res) => {
		const valErr = validationResult(req);
		if (!valErr.isEmpty()) {
			return res.send(valErr);
		}
		const list_id = req.body.list_id;
		const user_id = req.body.user_id;
		const sql = "DELETE FROM lists WHERE list_id = ? AND user_id = ?";
		db.query(sql, [list_id, user_id], (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	}
);

router.patch(
	"/editList",
	[
		check("newText")
			.trim()
			.notEmpty()
			.matches(/^[a-z0-9 ]+$/i)
			.isLength({ min: 1, max: 45 }),
		check("list_id").isNumeric().notEmpty(),
	],
	(req, res) => {
		const valErr = validationResult(req);
		if (!valErr.isEmpty()) {
			return res.send(valErr);
		}
		const newText = req.body.newText;
		const list_id = req.body.list_id;
		const sql = "UPDATE lists SET name = ? WHERE list_id = ?";
		db.query(sql, [newText, list_id], (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	}
);

//Display tasks according to current displayed list
router.get("/:list_id", [check("list_id").isNumeric().notEmpty()], (req, res) => {
	const valErr = validationResult(req);
	if (!valErr.isEmpty()) {
		return res.send(valErr);
	}
	const list_id = req.params.list_id;
	const sql = "SELECT * FROM posts WHERE list_id = ?";
	db.query(sql, list_id, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send(result);
	});
});

//Get all lists belonging to user
router.post("/", [check("userId").isNumeric().notEmpty()], (req, res) => {
	const valErr = validationResult(req);
	if (!valErr.isEmpty()) {
		return res.send(valErr);
	}
	const userId = req.body.userId;
	const sql = "SELECT * FROM lists WHERE user_id = ?";
	db.query(sql, userId, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

module.exports = router;
