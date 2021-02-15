import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useUserContext } from "../../contexts/userContext";
import { TodosList } from "../index";

const ListProtectedRoute = () => {
	const { user } = useUserContext();

	return (
		<Route
			render={() => {
				if (user) {
					return <TodosList />;
				} else {
					return <Redirect to={{ pathname: "/login" }} />;
				}
			}}
		/>
	);
};

export default ListProtectedRoute;
