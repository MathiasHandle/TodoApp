import React from "react";

import { useTodosContext } from "../../contexts/todosContext";
import { useUserContext } from "../../contexts/userContext";
import { useListContext } from "../../contexts/listContext";

const CreateTodo = () => {
	const { addTodo, todos, todo, setTodo, isEditing, editTask, toggleTodoModal } = useTodosContext();
	const { userId } = useUserContext();
	const { currentListId } = useListContext();
	let importance = null;
	window.location.pathname === "/important" ? (importance = 1) : (importance = 0);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isEditing) {
			addTodo(todo, importance, currentListId, userId);
			setTodo("");
		} else {
			const newText = todo;
			editTask(newText);
		}
	};

	return (
		<form className="create-todo" onSubmit={handleSubmit}>
			<input
				className="input"
				id="todo-input"
				enterKeyHint="send"
				type="text"
				autoFocus
				placeholder="What you need to do?"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>

			<div className="create-todo-icons">
				<button className="btn" onClick={handleSubmit}>
					{!isEditing ? "Add Task" : "Edit task"}
				</button>

				{todos.length > 0 ? (
					<button className="btn" onClick={toggleTodoModal} type="button">
						Clear todos
					</button>
				) : null}
			</div>
		</form>
	);
};

export default CreateTodo;
