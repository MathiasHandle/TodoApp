import React from "react";
import { Link } from "react-router-dom";

import { FaList } from "react-icons/fa";
import { useUserContext } from "../../contexts/userContext";
import { useListContext } from "../../contexts/listContext";
import { DeleteList, EditList } from "../";

const Lists = () => {
	const { user } = useUserContext();
	const { lists } = useListContext();
	const { toggleSidebar } = useUserContext();

	return user ? (
		<div className="sidebar-content">
			<ul>
				{lists.map((item) => {
					const { list_id, name } = item;
					return (
						<li key={list_id}>
							<Link to={`/lists/${list_id}`} className="list-name" onClick={toggleSidebar}>
								<FaList item={item} className="list-icon" />
								<p>{name}</p>
							</Link>

							<EditList item={item} />
							<DeleteList item={item} />
						</li>
					);
				})}
			</ul>
		</div>
	) : (
		<div className="sidebar-content">
			<ul>
				{lists.map((item) => {
					const { list_id, name } = item;
					return (
						<li key={list_id}>
							<Link to="/login" className="list-name" onClick={toggleSidebar}>
								<FaList className="list-icon" />
								<p>{name}</p>
							</Link>

							<Link to="/login" className="list-icons" onClick={toggleSidebar}>
								<EditList item={item} />
								<DeleteList item={item} />
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Lists;
