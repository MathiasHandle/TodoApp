import { Link } from "react-router-dom";

import { useUserContext } from "../../contexts/userContext";
import { ModalUser, OpenSidebar } from "../";

const RegisterUser = () => {
	const { nameReg, passwordReg, setNameReg, setPasswordReg, register } = useUserContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		register();
		setNameReg("");
		setPasswordReg("");
	};

	return (
		<div className="account-container">
			<ModalUser />

			<section className="card account-card">
				<h1>Register</h1>
				<OpenSidebar />

				<form onSubmit={(e) => handleSubmit(e)}>
					<div>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							autoFocus
							autoComplete="off"
							enterKeyHint="send"
							autoCorrect="off"
							spellCheck="off"
							placeholder="Your name"
							name="name"
							value={nameReg}
							className="input"
							onChange={(e) => setNameReg(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							enterKeyHint="send"
							placeholder="Your password"
							name="password"
							value={passwordReg}
							className="input"
							onChange={(e) => setPasswordReg(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn" onClick={(e) => handleSubmit(e)}>
						Register
					</button>
				</form>

				<div className="account-card-footer">
					<p>Already have an account?</p>
					<Link to="/login">
						<h6>Log in here!</h6>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default RegisterUser;
