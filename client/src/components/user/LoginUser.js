import { Link } from "react-router-dom";

import { useUserContext } from "../../contexts/userContext";
import { ModalUser, OpenSidebar } from "../";

const LoginUser = () => {
	const { nameLog, passwordLog, setNameLog, setPasswordLog, login } = useUserContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		login();
		setNameLog("");
		setPasswordLog("");
	};

	return (
		<div className="account-container">
			<ModalUser />

			<section className="card account-card">
				<h1>Login</h1>
				<OpenSidebar />
				<form onSubmit={(e) => handleSubmit(e)}>
					<div>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							autoComplete="off"
							autoCorrect="off"
							spellCheck="off"
							enterKeyHint="send"
							autoFocus
							placeholder="Your name"
							name="name"
							value={nameLog}
							className="input"
							onChange={(e) => setNameLog(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							enterKeyHint="send"
							placeholder="Your password"
							name="password"
							value={passwordLog}
							className="input"
							onChange={(e) => setPasswordLog(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn" onClick={(e) => handleSubmit(e)}>
						Log in
					</button>
				</form>

				<div className="account-card-footer">
					<p>Don't have an account yet?</p>
					<Link to="/register">
						<h6>Register here!</h6>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default LoginUser;
