
import React, { useState, useEffect, useContext } from "react";
import UserContext  from "../UserContext";
import JoblyApi from "../api";
import { useNavigate } from "react-router-dom";

import "../Styles/Forms.css"

function EditProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext); // Get current user from context
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate(); // To redirect after profile update

    useEffect(() => {
        // Pre-fill the form with the current user's data
        if (currentUser) {
            setFormData({
                username: currentUser.username,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,

            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(f => ({
            ...f,
            [name]: value
        }));
    };

    const formDataForUpdate = (formData) => {
        return {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make PATCH request to backend to update the profile
            let updatedUser = await JoblyApi.updateProfile(currentUser.username, formDataForUpdate(formData));
            setCurrentUser(updatedUser);  // Update user in context
            navigate("/");  // Redirect to home or another page
        } catch (err) {
            setFormErrors(err);
            console.error("Error updating profile:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    readOnly
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
            <button type="submit">Update Profile</button>
        </form>
    );
}

export default EditProfileForm;
