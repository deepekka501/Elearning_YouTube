import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Admin/CSS/RegisterAdmin.css";

const AdminRegistration = () => {
	const [data, setData] = useState({
		name: "", // Updated to reflect the single 'name' field in the schema
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	// Handle input change
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/admin/register";
			const { data: res } = await axios.post(url, data);
			navigate("/admin/login"); // Redirect to the login page
			console.log(res.message); // For debugging purposes
		} catch (error) {
			// Handle errors from the server
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="signup-container">
			<div className="signup-form-container">
				<div className="left">
					<h1>Welcome Back</h1>
					<Link to="/admin/login">
						<button type="button" className="white-btn">
							Sign In
						</button>
					</Link>
				</div>
				<div className="right">
					<form className="form-container" onSubmit={handleSubmit}>
						<h1>Create Admin Account</h1>
						{/* Name input */}
						<input
							type="text"
							placeholder="Name"
							name="name" // Updated to match the schema
							onChange={handleChange}
							value={data.name}
							required
							className="input"
						/>
						{/* Email input */}
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input"
						/>
						{/* Password input */}
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
						/>
						{/* Error message */}
						{error && <div className="error-msg">{error}</div>}
						{/* Submit button */}
						<button type="submit" className="green-btn">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminRegistration;
