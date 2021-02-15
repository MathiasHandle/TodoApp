import React from "react";
import { NavLink } from "react-router-dom";

import { useUserContext } from "../../contexts/userContext";
import { useListContext } from "../../contexts/listContext";

const CreateList = () => {
	const { user } = useUserContext();
	const { list, setList, createList, isEditingList, editList } = useListContext();
	const { toggleSidebar } = useUserContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isEditingList) {
			createList();
			setList("");
		} else {
			const newText = list;
			editList(newText);
		}
	};

	return user ? (
		<div className="createList">
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					className="input"
					enterKeyHint="send"
					id="list-input"
					value={list}
					placeholder="Create List"
					onChange={(e) => setList(e.target.value)}
				/>
				<button type="submit" onClick={(e) => handleSubmit(e)} className="btn">
					{!isEditingList ? "Create List" : "Edit List"}
				</button>
			</form>
		</div>
	) : (
		<div className="createList">
			<NavLink to="/login" onClick={toggleSidebar}>
				<form>
					<input type="text" className="input" placeholder="Create List" />

					<button className="btn">Create List</button>
				</form>
			</NavLink>
		</div>
	);
};

export default CreateList;
