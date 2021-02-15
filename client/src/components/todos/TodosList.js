import React, { useEffect } from "react";

import { useTodosContext } from "../../contexts/todosContext";
import { CreateTodo, Todo, ModalTodos, OpenSidebar } from "../";
import { useListContext } from "../../contexts/listContext";

const TodosList = () => {
	const { todos } = useTodosContext();
	const { currentListId, setCurrentListId, currentListName } = useListContext();
	const pathname = window.location.pathname;
	let list_id = "";

	//Setting path name
	const reg = /\d/g; //List id
	const reg2 = /\//g; //If at home card (no list id)
	if (pathname.match(reg)) {
		list_id = Number(pathname.slice(7));
	} else if (pathname.match(reg2)) {
		list_id = "home";
	}
	useEffect(() => {
		setCurrentListId(list_id);
	}, [list_id, setCurrentListId, currentListId]);

	return (
		<section className="todo-list card">
			<OpenSidebar />
			<ModalTodos />
			<h1>{currentListName}</h1>
			<CreateTodo />

			<div className="todo-list-container">
				{todos.length < 1 ? <h4>No Todos</h4> : null}
				{todos.map((item) => {
					return <Todo key={item.todo_id} item={item} />;
				})}
			</div>
		</section>
	);
};

export default TodosList;
