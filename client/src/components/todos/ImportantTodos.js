import React, { useEffect } from "react";

import { useTodosContext } from "../../contexts/todosContext";
import { useListContext } from "../../contexts/listContext";
import { useUserContext } from "../../contexts/userContext";
import { Todo, CreateTodo, OpenSidebar } from "../";

const ImportantTodos = () => {
	const { todos } = useTodosContext();
	const { currentListId, setCurrentListId } = useListContext();
	const { user } = useUserContext();

	const filteredTodos = todos.filter((item) => item.important === 1);
	const pathname = window.location.pathname;

	useEffect(() => {
		//It would trigger re-render thus reseting todosState -> not working properly when there is no user
		if (user) {
			if (pathname === "/important") {
				setCurrentListId("important");
			}
		}
	}, [pathname, setCurrentListId, currentListId, user]);

	return (
		<section className="todo-list card">
			<OpenSidebar />
			<h1>Important</h1>
			<CreateTodo />

			<div className="todo-list-container">
				{todos.length < 1 ? <h4>No Todos</h4> : null}

				{filteredTodos.map((item) => {
					return <Todo key={item.todo_id} item={item} />;
				})}
			</div>
		</section>
	);
};

export default ImportantTodos;
