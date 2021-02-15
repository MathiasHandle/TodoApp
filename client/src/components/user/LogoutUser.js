import { useUserContext } from "../../contexts/userContext";

const LogoutUser = () => {
	const { logout, toggleSidebar } = useUserContext();

	const handleLogout = () => {
		logout();
		toggleSidebar();
	};

	return (
		<h6 className="logout" type="button" onClick={handleLogout}>
			Log out
		</h6>
	);
};

export default LogoutUser;
