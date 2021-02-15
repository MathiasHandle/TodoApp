import React from "react";

import { SidebarHeader, Lists, CreateList } from "../";
import { useUserContext } from "../../contexts/userContext";
import { AiOutlineMenuFold } from "react-icons/ai";

const Sidebar = () => {
	const { toggleSidebar } = useUserContext();
	return (
		<aside id="sidebar" className="sidebar">
			<AiOutlineMenuFold className="sidebar-close-icon" onClick={toggleSidebar} />
			<div className="sidebar-container">
				<SidebarHeader />

				<Lists />

				<CreateList />
			</div>
		</aside>
	);
};

export default Sidebar;
