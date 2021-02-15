import React from "react";

import { MdDeleteForever } from "react-icons/md";
import { useUserContext } from "../../contexts/userContext";
import { useTodosContext } from "../../contexts/todosContext";

const DeleteList = ({ item }) => {
	const { user } = useUserContext();
	const { clearTodos } = useTodosContext();

	const handleDelete = () => {
		const { list_id } = item;
		clearTodos(true, list_id);
	};

	return user ? (
		<MdDeleteForever size={20} className="delete-icon-list" onClick={handleDelete} />
	) : (
		<MdDeleteForever size={20} className="delete-icon-list" />
	);
};

export default DeleteList;
