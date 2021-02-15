import { Route, Redirect } from "react-router-dom";

const Logout = () => {
	return (
		<Route
			render={() => {
				return <Redirect to={{ pathname: "/" }} />;
			}}
		/>
	);
};

export default Logout;
