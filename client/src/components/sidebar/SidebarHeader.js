import React from "react";
import { Link } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";

import { useUserContext } from "../../contexts/userContext";
import { SearchBar, LogoutUser } from "../";

const SidebarHeader = () => {
	const { user, toggleSidebar } = useUserContext();

	return user ? (
		<div className="sidebar-header">
			<div className="sidebar-account">
				<h2>{user}</h2>

				<Link to="/logout">
					<LogoutUser />
				</Link>
			</div>

			<SearchBar />

			<div className="sidebar-main-links">
				<ul>
					<li>
						<Link to="/" onClick={toggleSidebar}>
							<div>
								<AiFillHome className="home-icon" />
								<p>Home</p>
							</div>
						</Link>
					</li>

					<li>
						<Link to="/important" onClick={toggleSidebar}>
							<div>
								<BsFillStarFill className="star-icon" />
								<p>Important</p>
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	) : (
		<div className="sidebar-header">
			<div className="sidebar-account">
				<Link to="/login" onClick={toggleSidebar}>
					<h2>Anonym</h2>
				</Link>

				<nav>
					<ul>
						<Link to="/login" onClick={toggleSidebar}>
							<li>
								<h6>Log In</h6>
							</li>
						</Link>

						<Link to="/register" onClick={toggleSidebar}>
							<li>
								<h6>Register</h6>
							</li>
						</Link>
					</ul>
				</nav>
			</div>

			<SearchBar />

			<div className="sidebar-main-links">
				<ul>
					<li>
						<Link to="/" onClick={toggleSidebar}>
							<div>
								<AiFillHome className="home-icon" />
								<p>Home</p>
							</div>
						</Link>
					</li>

					<li>
						<Link to="/important" onClick={toggleSidebar}>
							<div>
								<BsFillStarFill className="star-icon" />
								<p>Important</p>
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SidebarHeader;
