import React from "react";

import { useTodosContext } from "../../contexts/todosContext";

const ModalTodos = () => {
	const { toggleTodoModal, todosModal } = useTodosContext();

	return todosModal ? (
		<div id="todos-overlay" className="todos-overlay active">
			<div id="todos-modal" className="todos-modal active card">
				<h3>Warning</h3>
				<p>This will delete all of the tasks from every single list, do you want to proceed?</p>
				<button id="yes" className="btn" onClick={(e) => toggleTodoModal(e)}>
					Yes
				</button>
				<button id="no" className="btn" onClick={(e) => toggleTodoModal(e)}>
					No
				</button>
			</div>
		</div>
	) : (
		<div id="todos-overlay" className="todos-overlay">
			<div id="todos-modal" className="todos-modal card">
				<h3>Warning</h3>
				<p>This will delete all of the tasks from every single list, do you want to proceed?</p>
				<button id="yes" className="btn" onClick={(e) => toggleTodoModal(e)}>
					Yes
				</button>
				<button id="no" className="btn" onClick={(e) => toggleTodoModal(e)}>
					No
				</button>
			</div>
		</div>
	);
};

export default ModalTodos;
