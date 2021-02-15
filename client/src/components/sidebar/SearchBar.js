import React, { useEffect } from "react";

import { useTodosContext } from "../../contexts/todosContext";
import { useUserContext } from "../../contexts/userContext";

const SearchBar = () => {
	const { searchbar, setSearchbar, isSearching, setIsSearching, getAllTodos } = useTodosContext();
	const { toggleSidebar } = useUserContext();

	const handleChange = (e) => {
		setIsSearching(true);
		setSearchbar(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		toggleSidebar();
	};

	//When deleting searched string it resets todosState -> basically acts like history otherwise the todosContext is changed and searching doesnt work backwards
	const handleKeyDown = (e) => {
		let key = e.keyCode;
		if (key === 8 && isSearching === true) {
			getAllTodos();
			return;
		}
		if (key === 8) {
			getAllTodos();
		}
	};

	//Fetching initialState or All todos from DB when searchbar is empty
	useEffect(() => {
		if (searchbar === "") {
			setIsSearching(false);
			getAllTodos();
		}
	}, [isSearching, setIsSearching, searchbar, getAllTodos]);

	return (
		<form action="" className="search-bar" onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				className="input"
				id="search-bar-input"
				placeholder="Search..."
				value={searchbar}
				onChange={(e) => handleChange(e)}
				onKeyDown={(e) => handleKeyDown(e)}
			/>
		</form>
	);
};

export default SearchBar;
