import React, { useContext, useState, useEffect, useReducer, useCallback } from "react";
import Axios from "axios";

import { listReducer } from "../reducers/";
import { actionTypes, apiUrl } from "../constants";
import { useUserContext } from "../contexts/userContext";
import { inputAnimation } from "../constants/animations";

Axios.defaults.withCredentials = true;
const ListContext = React.createContext();

const initialState = {
	lists: [
		{ list_id: 1, name: "Work" },
		{ list_id: 2, name: "Kids" },
		{ list_id: 3, name: "Car" },
	],
};

export const ListContextProvider = ({ children }) => {
	const { userId } = useUserContext();

	const [listState, dispatch] = useReducer(listReducer, initialState);
	const [list, setList] = useState(""); //createList input
	const [currentListId, setCurrentListId] = useState("");
	const [currentListName, setCurrentListName] = useState("");

	const [editedListId, setEditedListId] = useState(null);
	const [isEditingList, setIsEditingList] = useState(false);

	//Current list name
	useEffect(() => {
		const lst = listState.lists.filter((item) => item.list_id === currentListId);
		lst.length > 0 ? setCurrentListName(lst[0].name) : setCurrentListName("home");
	}, [currentListId, listState.lists]);

	//XXX Fetch lists
	const fetchLists = useCallback(() => {
		Axios.post(`${apiUrl}/lists`, {
			userId: userId,
		}).then((response) => {
			const lists = response.data;
			dispatch({ type: actionTypes.getLists, payload: { lists: lists } });
		});
	}, [userId]);

	//Fetching lists on state change or reload of a page
	useEffect(() => {
		if (userId) {
			fetchLists();
		} else {
			dispatch({ type: actionTypes.setListsInitial, payload: initialState });
		}
	}, [userId, fetchLists, currentListId]);

	//XXX Create list
	const createList = () => {
		const input = "list-input";
		Axios.post(`${apiUrl}/lists/createList`, {
			userId: userId,
			list: list,
		}).then((response) => {
			//console.log("RESPONSE: ", response);
			if (!response.data.errors) {
				inputAnimation(true, input);
				fetchLists();
			} else {
				inputAnimation(false, input);
			}
		});
	};

	//XXX Delete list
	const deleteList = (list_id) => {
		Axios.delete(`${apiUrl}/lists/deleteList`, {
			data: { list_id: list_id, user_id: userId },
		});
		dispatch({ type: actionTypes.deleteList, payload: { listId: list_id } });
	};

	//XXX Edit list
	const getListEditDetails = (item) => {
		const input = document.getElementById("list-input");
		const { list_id, name } = item;
		setIsEditingList(true);
		setEditedListId(list_id);
		setList(name);
		input.focus();
	};

	const editList = (newText) => {
		if (userId) {
			setIsEditingList(false);
			Axios.patch(`${apiUrl}/lists/editList`, { newText: newText, list_id: editedListId }).then((response) => {
				if (!response.data.errors) dispatch({ type: actionTypes.editList, payload: { newText, editedListId } });
			});
			setList("");
		}
	};

	return (
		<ListContext.Provider
			value={{
				...listState,
				list,
				setList,
				createList,
				currentListId,
				setCurrentListId,
				deleteList,
				getListEditDetails,
				editList,
				isEditingList,
				currentListName,
			}}
		>
			{children}
		</ListContext.Provider>
	);
};

export const useListContext = () => {
	return useContext(ListContext);
};
