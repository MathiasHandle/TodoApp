import React from "react";

import { BsFillStarFill } from "react-icons/bs";
import { useTodosContext } from "../../contexts/todosContext";

const ToggleImportant = ({ item }) => {
	const { toggleState } = useTodosContext();
	const { todo_id, important } = item;
	const attribute = "important";
	let newValue = null;

	const handleToggle = () => {
		important === 0 ? (newValue = 1) : (newValue = 0);
		toggleState(todo_id, attribute, newValue);
	};

	return item.important ? (
		<BsFillStarFill size={30} className="star-icon important" onClick={handleToggle} />
	) : (
		<BsFillStarFill size={30} className="star-icon" onClick={handleToggle} />
	);
};

export default ToggleImportant;
