import React from "react";

import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from "react-icons/ri";
import { useTodosContext } from "../../contexts/todosContext";

const ToggleFinished = ({ item }) => {
	const { toggleState } = useTodosContext();
	const { todo_id, finished } = item;
	const attribute = "finished";
	let newValue = null;

	const handleToggle = () => {
		finished === 0 ? (newValue = 1) : (newValue = 0);
		toggleState(todo_id, attribute, newValue);
	};

	return item.finished ? (
		<RiCheckboxCircleLine size={30} className="check-icon check-finished" onClick={handleToggle} />
	) : (
		<RiCheckboxBlankCircleLine size={30} className="check-icon" onClick={handleToggle} />
	);
};

export default ToggleFinished;
