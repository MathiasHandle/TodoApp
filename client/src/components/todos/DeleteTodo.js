import React from "react";

import { MdDeleteForever } from "react-icons/md";
import { useTodosContext } from "../../contexts/todosContext";

const DeleteTodo = ({ item }) => {
	const { deleteTodo } = useTodosContext();
	const { todo_id } = item;

	return <MdDeleteForever size={30} className="delete-icon" onClick={() => deleteTodo(todo_id)} />;
};

export default DeleteTodo;
