import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/Forms.css";

function LoginForm({ login }) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(f => ({
            ...f,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await login(formData);  // Call login function
            if (result.success) {
                navigate("/");  // Redirect to homepage on successful login
            } else {
                setFormErrors(result.errors);

            }
        } catch (err) {
            console.error("Error during login:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {formErrors.length > 0 && (
                <div>
                    <h4>Errors:</h4>
                    <ul>
                        {formErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;


