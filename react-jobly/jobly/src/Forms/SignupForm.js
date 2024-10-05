import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Forms.css"

function SignupForm({ signup }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    const navigate = useNavigate(); // You need to initialize navigate here

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(f => ({
            ...f,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password length validation
        if (formData.password.length < 5) {
            setFormErrors(["Password must be at least 5 characters long"]);
            return;
        }

        try {
            let result = await signup(formData);  // Call signup function passed as prop
            if (result.success) {
                navigate("/");
            } else {
                setFormErrors(result.errors);
            }
        } catch (err) {
            console.error("Error during signup:", err);
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
            <div>
                <label>First Name:</label>
                <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Display error messages */}
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

            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;


