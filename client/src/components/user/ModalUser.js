import React from "react";

import { useUserContext } from "../../contexts/userContext";

const ModalUser = () => {
	const { modalMessage } = useUserContext();

	return !modalMessage ? null : (
		<ul className="user-modal show " id="modal">
			{modalMessage.map((item, index) => (
				<li key={index}>
					<h4>{item}</h4>
				</li>
			))}
		</ul>
	);
};

export default ModalUser;
