import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./assets/styles/index.scss";
import { TodosContextProvider } from "./contexts/todosContext";
import { UserContextProvider } from "./contexts/userContext";
import { ListContextProvider } from "./contexts/listContext";

ReactDOM.render(
	<UserContextProvider>
		<ListContextProvider>
			<TodosContextProvider>
				<App />
			</TodosContextProvider>
		</ListContextProvider>
	</UserContextProvider>,
	document.getElementById("root")
);
