import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Important, Login, Register, Page404, Logout } from "./pages/";
import { Sidebar, ListProtectedRoute } from "./components";

const App = () => {
	return (
		<Router>
			<Sidebar />

			<Switch>
				<Route path="/" exact component={Home} />

				<Route path="/important" exact strict component={Important} />

				<Route path="/lists" component={ListProtectedRoute} />

				<Route path="/register" exact strict component={Register} />

				<Route path="/login" exact strict component={Login} />

				<Route path="/logout" component={Logout} />

				<Route path="*" component={Page404} />
			</Switch>
		</Router>
	);
};

export default App;
