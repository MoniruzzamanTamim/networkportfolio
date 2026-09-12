import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

import { auth } from "../../firebase/firebase";
import profileImage from "../../assets/Image/me-1.jpg";
import "./Login.css";

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const from = location.state?.from?.pathname || "/premium";

	const handleLogin = async (event) => {
		event.preventDefault();
		setError("");
		setLoading(true);

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate(from, { replace: true });
		} catch (loginError) {
			switch (loginError.code) {
				case "auth/invalid-credential":
					setError("Email or password is incorrect.");
					break;
				case "auth/user-not-found":
					setError("User not found.");
					break;
				case "auth/wrong-password":
					setError("Wrong password.");
					break;
				default:
					setError("Login failed. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-page">
			<div className="login-shell">
				<section className="login-card">
					<div className="login-card__eyebrow">Network Portfolio / Private access</div>
					<h1>Welcome back<span>.</span></h1>
					<p className="login-subtitle">
						Sign in to continue to your premium network workspace.
					</p>

					{error && <div className="login-error">{error}</div>}

					<form onSubmit={handleLogin}>
						<div className="login-group">
							<label htmlFor="login-email">Email address</label>
							<input
								id="login-email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
							/>
						</div>

						<div className="login-group">
							<div className="login-label-row">
								<label htmlFor="login-password">Password</label>
								<span>Secure sign-in</span>
							</div>
							<input
								id="login-password"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
							/>
						</div>

						<button type="submit" className="login-button" disabled={loading}>
							<span>{loading ? "Logging in..." : "Enter premium workspace"}</span>
							<span className="login-button__arrow">-&gt;</span>
						</button>
					</form>

					<div className="login-footer-note">
						<span className="login-footer-note__dot" />
						Your session is protected with Firebase authentication.
					</div>
				</section>

				<aside className="login-showcase">
					<div className="showcase-topline">
						<span>01 / 04</span>
						<span className="showcase-live"><i /> Online</span>
					</div>
					<div className="showcase-image-wrap">
						<img src={profileImage} alt="Network portfolio owner" className="showcase-image" />
						<div className="showcase-image-label">Network operator</div>
					</div>
					<div className="showcase-content">
						<p className="showcase-kicker">Built for real networks</p>
						<h2>Read the signal.<br /><em>Move with clarity.</em></h2>
						<p className="showcase-description">
							A focused toolkit for ISP intelligence, diagnostics, speed testing, and infrastructure work.
						</p>
						<div className="showcase-stats">
							<div><strong>06</strong><span>Tools</span></div>
							<div><strong>24/7</strong><span>Access</span></div>
							<div><strong>PRO</strong><span>Workspace</span></div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
};

export default Login;
