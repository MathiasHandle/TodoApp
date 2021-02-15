import React from "react";

import { EditTodo, DeleteTodo, ToggleImportant } from "../";
import ToggleFinished from "./ToggleFinished";

const Todo = ({ item }) => {
	return (
		<div className={item.finished ? "todo-item todo-finished" : "todo-item"}>
			<ToggleFinished item={item} />

			<p>{item.todo}</p>

			<div className="todo-item-icons">
				<EditTodo item={item} />
				<DeleteTodo item={item} />
				<ToggleImportant item={item} />
			</div>
		</div>
	);
};

export default Todo;
