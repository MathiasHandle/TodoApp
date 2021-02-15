import React from "react";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useUserContext } from "../../contexts/userContext";

const OpenSidebar = () => {
	const { toggleSidebar } = useUserContext();

	return <AiOutlineMenuUnfold className="sidebar-open-icon" onClick={toggleSidebar} />;
};

export default OpenSidebar;
