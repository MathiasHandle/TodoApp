import React from "react";

import { MdEdit } from "react-icons/md";
import { useListContext } from "../../contexts/listContext";
import { useUserContext } from "../../contexts/userContext";

const EditList = ({ item }) => {
	const { getListEditDetails } = useListContext();
	const { user } = useUserContext();

	return user ? (
		<MdEdit size={20} className="edit-icon-list" onClick={() => getListEditDetails(item)} />
	) : (
		<MdEdit size={20} className="edit-icon-list" />
	);
};

export default EditList;
