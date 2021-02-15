import React from "react";
import { Redirect, Route } from "react-router-dom";

import { LoginUser } from "../components/";
import { useUserContext } from "../contexts/userContext";

const Login = () => {
	const { user } = useUserContext();

	return (
		<Route
			render={() => {
				if (!user) {
					return <LoginUser />;
				} else {
					return <Redirect to={{ pathname: "/" }} />;
				}
			}}
		/>
	);
};

export default Login;
