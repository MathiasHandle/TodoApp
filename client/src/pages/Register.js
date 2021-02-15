import React from "react";
import { Redirect, Route } from "react-router-dom";

import { RegisterUser } from "../components/";
import { useUserContext } from "../contexts/userContext";

const Register = () => {
	const { user } = useUserContext();

	return (
		<Route
			render={() => {
				if (!user) {
					return <RegisterUser />;
				} else {
					return <Redirect to={{ pathname: "/" }} />;
				}
			}}
		/>
	);
};

export default Register;
