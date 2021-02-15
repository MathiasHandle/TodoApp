import React, { useContext, useState, useEffect, useCallback } from "react";
import Axios from "axios";

import { apiUrl } from "../constants/";

const UserContext = React.createContext();

//Allow Axios send cookies in http header request
//Axios.defaults -> setting up default config for axios
Axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userId, setUserId] = useState(null);

	//Reg details
	const [nameReg, setNameReg] = useState("");
	const [passwordReg, setPasswordReg] = useState("");
	//Log in details
	const [nameLog, setNameLog] = useState("");
	const [passwordLog, setPasswordLog] = useState("");
	//Modal detailsu
	const [displayModal, setDisplayModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const modal = document.getElementById("modal");

	//XXX Show modal
	const showModal = useCallback(() => {
		if (displayModal) {
			modal.classList.add("show");
			setTimeout(() => {
				setDisplayModal(false);
				modal.classList.remove("show");
			}, 3000);
		}
	}, [displayModal, modal]);

	useEffect(() => {
		showModal();
	}, [showModal]);

	//Processing errors and messages from back-end
	const processErrors = (err) => {
		//console.log("ERR: ", err);
		const filteredMsgs = err.filter((item) => item.msg !== "Invalid value");
		setModalMessage(filteredMsgs.map((item) => item.msg));
		setDisplayModal(true);
	};

	const toggleSidebar = () => {
		const sidebar = document.getElementById("sidebar");
		sidebar.classList.toggle("sidebar--show");
	};

	//XXX Register
	const register = () => {
		Axios.post(`${apiUrl}/users/register`, {
			userName: nameReg,
			userPassword: passwordReg,
		}).then((response) => {
			const errors = response.data.errors;
			processErrors(errors);
		});
	};

	//XXX Login
	const login = () => {
		Axios.post(`${apiUrl}/users/login`, {
			userName: nameLog,
			userPassword: passwordLog,
		}).then((response) => {
			//console.log(response);
			if (!response.data.errors) {
				setUser(response.data.name);
				setUserId(response.data.user_id);
			} else {
				const errors = response.data.errors;
				processErrors(errors);
			}
		});
	};

	//Checking if user is logged in on every refresh of a page
	useEffect(() => {
		Axios.get(`${apiUrl}/users/login`).then((response, err) => {
			//console.log("GET /login RESPONSE: ", response);
			if (response.data.loggedIn === true) {
				setUser(response.data.user.name);
				setUserId(response.data.user.user_id);
			}
		});
	}, []);

	//XXX Logout
	const logout = () => {
		Axios.post(`${apiUrl}/users/logout`).then((response) => {
			//console.log(response);
			if (!response.data.user) {
				setUser("");
				setUserId(null);
			}
		});
	};

	return (
		<UserContext.Provider
			value={{
				user,
				userId,
				nameReg,
				passwordReg,
				setNameReg,
				setPasswordReg,
				register,
				nameLog,
				passwordLog,
				setNameLog,
				setPasswordLog,
				login,
				logout,
				modalMessage,
				toggleSidebar,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	return useContext(UserContext);
};
