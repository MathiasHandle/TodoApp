import React, { useContext, useEffect, useReducer, useState, useCallback } from "react";

import { todoReducer } from "../reducers/";
import actionTypes from "../constants/actionTypes";
import Axios from "axios";
import { apiUrl } from "../constants/";
import { useListContext } from "./listContext";
import { useUserContext } from "./userContext";
import { inputAnimation } from "../constants/animations";

const TodosContext = React.createContext();

const initialState = {
	todos: [
		{
			todo_id: 1608592490852,
			todo: "Buy milk and chocolate",
			important: 0,
			finished: 1,
			user_id: "Anonym",
			list_id: null,
		},
		{
			todo_id: 1608592490939,
			todo: "Take out trash",
			important: 0,
			finished: 0,
			user_id: "Anonym",
			list_id: null,
		},
		{
			todo_id: 1608634291740,
			todo: "Buy flowers for mom",
			important: 0,
			finished: 0,
			user_id: "Anonym",
			list_id: null,
		},
		{
			todo_id: 1608634291874,
			todo: "Repair washing machine",
			important: 1,
			finished: 0,
			user_id: "Anonym",
			list_id: null,
		},
	],
};

export const TodosContextProvider = ({ children }) => {
	const { currentListId, setCurrentListId, deleteList } = useListContext();
	const { userId } = useUserContext();

	const [todoState, dispatch] = useReducer(todoReducer, initialState);
	const [todo, setTodo] = useState(""); //Create todo input
	const [isEditing, setIsEditing] = useState(false);
	const [editedTaskId, setEditedTaskId] = useState(null);

	const [todosModal, setTodosModal] = useState(false);

	const [searchbar, setSearchbar] = useState("");
	const [isSearching, setIsSearching] = useState(false);

	//Get details about user and list
	const getTodoDetails = (list, user) => {
		let userId = null;
		let listId = null;
		list === "home" ? (listId = null) : (listId = list);
		user === null ? (userId = "Anonym") : (userId = user);
		return { listId: listId, userId: userId };
	};

	//Decoding special chars from DB
	const htmlDecode = (input) => {
		const decodedArray = input.map((item) => {
			const doc = new DOMParser().parseFromString(item.todo, "text/html");
			return { ...item, todo: doc.documentElement.textContent };
		});
		return decodedArray;
	};

	//XXX Fetch todos from DB
	const fetchTodos = useCallback(
		(list_id) => {
			if (currentListId === "" || currentListId === undefined) {
				return;
			} else if (currentListId === "home" || currentListId === "important") {
				Axios.post(`${apiUrl}/todo/getAllTodos`, {
					user_id: userId,
				}).then((result) => {
					const fetchedTodos = htmlDecode(result.data);
					dispatch({ type: actionTypes.getAllTodos, payload: { todos: fetchedTodos } });
				});
			} else {
				Axios.get(`${apiUrl}/lists/${list_id}`).then((result) => {
					const fetchedTodos = htmlDecode(result.data);
					dispatch({ type: actionTypes.getTodos, payload: fetchedTodos });
				});
			}
		},
		[currentListId, userId]
	);

	useEffect(() => {
		if (userId) {
			fetchTodos(currentListId);
		}
		//On logout shows initial todos
		else {
			dispatch({ type: actionTypes.setTodosInitial, payload: initialState });
		}
	}, [userId, currentListId, fetchTodos, setCurrentListId]);

	const getAllTodos = useCallback(() => {
		if (userId) {
			fetchTodos(currentListId);
		} else {
			dispatch({ type: actionTypes.setTodosInitial, payload: initialState });
		}
	}, [userId, currentListId, fetchTodos]);

	//XXX Add todo
	const addTodo = (todo, importance, currentListId, userId) => {
		const details = getTodoDetails(currentListId, userId);
		const input = "todo-input";
		if (userId) {
			Axios.post(`${apiUrl}/todo/createTodo`, {
				todo: todo,
				importance: importance,
				currentListId: details.listId,
				user_id: details.userId,
			}).then((result) => {
				//console.log(result);
				if (!result.data.errors) {
					inputAnimation(true, input);
					const todo_id = result.data[0].todo_id;
					dispatch({
						type: actionTypes.addTodo,
						payload: { todo, todo_id: todo_id, importance, currentListId: details.listId, userId: details.userId },
					});
				} else {
					inputAnimation(false, input);
				}
			});
		} else {
			if (todo === "") {
				inputAnimation(false, input);
				return;
			} else {
				inputAnimation(true, input);
				const todo_id = Date.now();
				dispatch({
					type: actionTypes.addTodo,
					payload: { todo, todo_id, importance, currentListId: details.listId, userId: details.userId },
				});
			}
		}
	};

	//XXX Edit
	const getEditDetails = (item) => {
		const input = document.getElementById("todo-input");
		const { todo_id, todo } = item;
		setIsEditing(true);
		setEditedTaskId(todo_id);
		setTodo(todo);
		input.focus();
	};

	const editTask = (newText) => {
		setIsEditing(false);
		if (userId) {
			Axios.patch(`${apiUrl}/todo/editTodo`, { newText: newText, todo_id: editedTaskId, user_id: userId });
		}
		dispatch({ type: actionTypes.editTodo, payload: { newText, editedTaskId } });
		setTodo("");
	};

	//XXX Toggle State (Finished/Important)
	const toggleState = (todo_id, attribute, newValue) => {
		if (userId) {
			Axios.patch(`${apiUrl}/todo/toggleState`, {
				todo_id: todo_id,
				attribute: attribute,
				newValue: newValue,
				user_id: userId,
			});
		}
		dispatch({ type: actionTypes.toggleState, payload: { todo_id, attribute } });
	};

	//XXX Delete
	const deleteTodo = (id) => {
		if (userId) {
			Axios.delete(`${apiUrl}/todo/deleteTodo`, { data: { todo_id: id, user_id: userId } });
		}
		dispatch({ type: actionTypes.deleteTodo, payload: id });
	};

	//XXX Clear todos or delete whole list
	const clearTodos = (delList = false, lstId = null) => {
		if (userId) {
			const list = getTodoDetails(currentListId, userId);
			//Deleting list and clearing todos
			if (delList === true) {
				Axios.delete(`${apiUrl}/todo/clearList`, { data: { userId: list.userId, listId: lstId } });
				deleteList(lstId);
				dispatch({ type: actionTypes.clearTodos, payload: { list: lstId } });
			}
			//Just clearing todos
			else {
				Axios.delete(`${apiUrl}/todo/clearList`, {
					data: { userId: list.userId, listId: list.listId },
				});
				dispatch({ type: actionTypes.clearTodos });
			}
		} else {
			dispatch({ type: actionTypes.clearTodos });
		}
	};

	//XXX Todos modal
	const toggleTodoModal = (e) => {
		if (currentListId !== "home" || userId === null) {
			clearTodos();
			return;
		}
		setTodosModal(!todosModal);
		if (e.target.id === "yes") {
			clearTodos();
			setTodosModal(!todosModal);
		} else {
			setTodosModal(!todosModal);
		}
	};

	//XXX Search todos
	const searchTodos = useCallback(() => {
		if (userId) {
			if (searchbar === "") return;
			Axios.post(`${apiUrl}/todo/searchTodos`, {
				user_id: userId,
				text: searchbar,
			}).then((response) => {
				const fetchedTodos = htmlDecode(response.data);
				dispatch({ type: actionTypes.searchTodos, payload: { dbTodos: fetchedTodos } });
			});
		} else {
			dispatch({ type: actionTypes.searchTodos, payload: { text: searchbar } });
		}
	}, [searchbar, userId]);

	//Dynamically adjusting todosState depending on current searched string
	useEffect(() => {
		searchTodos();
	}, [searchbar, searchTodos]);

	return (
		<TodosContext.Provider
			value={{
				...todoState,
				addTodo,
				clearTodos,
				todo,
				setTodo,
				isEditing,
				editTask,
				setIsEditing,
				toggleState,
				fetchTodos,
				deleteTodo,
				getEditDetails,
				toggleTodoModal,
				todosModal,
				searchbar,
				setSearchbar,
				isSearching,
				setIsSearching,
				getAllTodos,
			}}
		>
			{children}
		</TodosContext.Provider>
	);
};

export const useTodosContext = () => {
	return useContext(TodosContext);
};
