import React from "react";

import { MdEdit } from "react-icons/md";
import { useTodosContext } from "../../contexts/todosContext";

const EditTodo = ({ item }) => {
	const { getEditDetails } = useTodosContext();

	return <MdEdit size={30} className="edit-icon" onClick={() => getEditDetails(item)} />;
};

export default EditTodo;
