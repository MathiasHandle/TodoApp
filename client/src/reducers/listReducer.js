import Axios from "axios";

import { actionTypes, apiUrl } from "../constants/";

Axios.defaults.withCredentials = true;

const listReducer = (listState, action) => {
	if (action.type === actionTypes.createList) {
		Axios.post(`${apiUrl}/lists/createList`, {
			userId: action.payload.userId,
			list: action.payload.list,
		});
		return { ...listState };
	}

	if (action.type === actionTypes.getLists) {
		const { lists } = action.payload;
		return { ...listState, lists: lists };
	}

	//Shows hard coded lists when user log out
	if (action.type === actionTypes.setListsInitial) {
		const initialState = action.payload;
		return { ...initialState };
	}

	if (action.type === actionTypes.deleteList) {
		const newList = listState.lists.filter((item) => item.list_id !== action.payload.listId);
		return { ...listState, lists: newList };
	}

	//Edit list
	if (action.type === actionTypes.editList) {
		const { editedListId, newText } = action.payload;
		const newLists = listState.lists.map((item) => {
			if (item.list_id === editedListId) {
				return { ...item, name: newText };
			}
			return item;
		});
		return { ...listState, lists: newLists };
	}
};

export default listReducer;
