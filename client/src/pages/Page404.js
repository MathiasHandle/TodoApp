import React from "react";
import { Redirect, Route } from "react-router-dom";

const Page404 = () => {
	return (
		<Route
			render={() => {
				return <Redirect to={{ pathname: "/" }} />;
			}}
		/>
	);
};

export default Page404;
