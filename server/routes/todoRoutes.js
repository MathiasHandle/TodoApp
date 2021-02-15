const express = require("express");
const db = require("../db");
const { check, validationResult } = require("express-validator");

let router = express.Router();

router.post("/getAllTodos", [check("user_id").exists().notEmpty().isNumeric()], (req, res) => {
	const valErr = validationResult(req);
	if (!valErr.isEmpty()) {
		return res.send(valErr);
	}
	const user_id = req.body.user_id;
	const sql = "SELECT * FROM posts WHERE user_id = ?";
	db.query(sql, user_id, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

router.post(
	"/createTodo",
	[
		check("todo").trim().notEmpty().escape().trim().isLength({ min: 1, max: 255 }),
		check("importance").isNumeric().isLength({ min: 1, max: 1 }),
		check("user_id").notEmpty().isNumeric(),
	],
	(req, res) => {
		const valErr = validationResult(req);
		if (!valErr.isEmpty()) {
			return res.send(valErr);
		}
		const todo = req.body.todo;
		const importance = req.body.importance;
		const currentListId = req.body.currentListId;
		const user_id = req.body.user_id;
		const sql = "INSERT INTO posts(user_id, list_id, todo, important) VALUES (?, ?, ?, ?)";
		const sql2 = "SELECT * FROM posts WHERE user_id = ? ORDER BY todo_id DESC LIMIT 1";
		db.query(sql, [user_id, currentListId, todo, importance], (err, result) => {
			console.log("RESULT 1: ", result);
			if (err) {
				throw err;
			}
			//Sending todo_id back to client -> reducer will use this id in todosState
			//Also can use AI instead of UUID and deal with todos ordering by timestamp
			else {
				db.query(sql2, [user_id], (err, result) => {
					if (err) throw err;
					console.log("RESULT 2: ", result);
					res.send(result);
				});
			}
		});
	}
);

router.patch(
	"/toggleState",
	[
		check("todo_id").exists().isNumeric(),
		check("attribute")
			.notEmpty()
			.matches(/^[(a-z)]+$/i),
		check("newValue").notEmpty().isNumeric(),
		check("user_id").notEmpty().isNumeric(),
	],
	(req, res) => {
		const valErr = validationResult(req);
		if (!valErr.isEmpty()) {
			return res.send(valErr);
		}
		const todo_id = req.body.todo_id;
		const attribute = req.body.attribute;
		const newValue = req.body.newValue;
		const user_id = req.body.user_id;
		const sql = "UPDATE posts SET ?? = ? WHERE todo_id = ? AND user_id = ?";
		db.query(sql, [attribute, newValue, todo_id, user_id], (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	}
);

router.delete("/deleteTodo", [check("todo_id").exists().isNumeric()], (req, res) => {
	const valErr = validationResult(req);
	if (!valErr.isEmpty()) {
		return res.send(valErr);
	}
	const todo_id = req.body.todo_id;
	const user_id = req.body.user_id;
	const sql = "DELETE FROM posts WHERE todo_id = ? AND user_id = ?";
	db.query(sql, [todo_id, user_id], (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

router.delete(
	"/clearList",
	[check("userId").notEmpty().isNumeric(), check("listId").optional({ nullable: true }).isNumeric()],
	(req, res) => {
		console.log("USER ID: ", req.body.userId);
		console.log(typeof req.body.userId);
		const valErr = validationResult(req);
		if (!valErr.isEmpty()) {
			return res.send(valErr);
		}
		const user_id = req.body.userId;
		const listId = req.body.listId;

		console.log("List ID:", user_id);
		console.log(typeof listId);
		if (listId === null) {
			const sql = "DELETE FROM posts WHERE user_id = ?";
			db.query(sql, user_id, (err, result) => {
				if (err) throw err;
				res.send(result);
			});
		} else if (listId === "important") {
			const sql = "DELETE FROM posts WHERE user_id = ? AND important = 1";
			db.query(sql, user_id, (err, result) => {
				if (err) throw err;
				res.send(result);
			});
		} else {
			const sql = "DELETE FROM posts WHERE user_id = ? AND list_id = ?";
			db.query(sql, [user_id, listId], (err, result) => {
				if (err) throw err;
				res.send(result);
			});
		}
	}
);

router.patch(
	"/editTodo",
	[
		check("todo_id").exists().isNumeric(),
		check("newText").trim().notEmpty().escape().trim().isLength({ min: 1, max: 255 }),
		check("user_id").notEmpty().isNumeric(),
	],
	(req, res) => {
		const valErr = validationResult(req);
		if (!valErr.isEmpty()) {
			return res.send(valErr);
		}
		const todoId = req.body.todo_id;
		const newText = req.body.newText;
		const user_id = req.body.user_id;
		const sql = "UPDATE posts SET todo = ? WHERE todo_id = ? AND user_id = ?";
		db.query(sql, [newText, todoId, user_id], (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	}
);

router.post(
	"/searchTodos",
	[check("user_id").exists().notEmpty().isNumeric(), check("text").exists().notEmpty().escape()],
	(req, res) => {
		const valErr = validationResult(req);
		if (!valErr.isEmpty()) {
			return res.send(valErr);
		}
		const user_id = req.body.user_id;
		const text = req.body.text;
		const sql = "SELECT * FROM posts WHERE user_id = ? AND todo REGEXP ?";
		db.query(sql, [user_id, text], (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	}
);

module.exports = router;
