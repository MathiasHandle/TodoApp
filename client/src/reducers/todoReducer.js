import { actionTypes } from "../constants/";

const todoReducer = (todosState, action) => {
	const { todos } = todosState;

	//Get all todos from DB
	if (action.type === actionTypes.getAllTodos) {
		const fetchedTodos = action.payload.todos;
		return { ...todosState, todos: fetchedTodos };
	}

	//Get todos from DB according to current list
	if (action.type === actionTypes.getTodos) {
		const fetchedTodos = action.payload;
		return { ...todosState, todos: fetchedTodos };
	}

	//Add Todo
	if (action.type === actionTypes.addTodo) {
		const { todo_id, todo, importance, currentListId, userId } = action.payload;
		return {
			...todosState,
			todos: [
				...todosState.todos,
				{
					todo_id: todo_id,
					todo: todo,
					important: importance,
					user_id: userId,
					list_id: currentListId,
					finished: 0,
				},
			],
		};
	}

	//Clear todos
	if (action.type === actionTypes.clearTodos) {
		if (action.payload !== undefined) {
			const listId = action.payload.list;
			const newList = todosState.todos.filter((item) => item.list_id !== listId);
			return { ...todosState, todos: newList };
		} else {
			return { ...todosState, todos: [] };
		}
	}

	//Edit Todo
	if (action.type === actionTypes.editTodo) {
		const { editedTaskId, newText } = action.payload;
		const newTodoss = todosState.todos.map((item) => {
			if (item.todo_id === editedTaskId) {
				return { ...item, todo: newText };
			}
			return item;
		});
		return { ...todosState, todos: newTodoss };
	}

	//Delete todo
	if (action.type === actionTypes.deleteTodo) {
		const filtered = todos.filter((item) => item.todo_id !== action.payload);
		return { ...todosState, todos: filtered };
	}

	//Toggle State (Finished/Important)
	if (action.type === actionTypes.toggleState) {
		const { todo_id, attribute } = action.payload;
		const updatedTodos = todosState.todos.map((item) => {
			if (item.todo_id === todo_id) {
				let newValue = null;
				item[attribute] === 0 ? (newValue = 1) : (newValue = 0);
				return { ...item, [attribute]: newValue };
			}
			return item;
		});
		return { ...todosState, todos: updatedTodos };
	}

	//Set to initial state on logout
	if (action.type === actionTypes.setTodosInitial) {
		const initialState = action.payload;
		return { ...initialState };
	}

	//Search todos
	if (action.type === actionTypes.searchTodos) {
		//Fetched data from database
		if (action.payload.dbTodos) return { ...todosState, todos: action.payload.dbTodos };
		//Pure front-end (user is NOT logged in)
		const { text } = action.payload;
		const regex = new RegExp(text, "gi");
		const filteredTodos = todos.filter((item) => {
			const match = item.todo.match(regex);
			return match;
		});
		return { ...todosState, todos: filteredTodos };
	}
};

export default todoReducer;
