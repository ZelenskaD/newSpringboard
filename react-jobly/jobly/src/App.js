import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import NotFound from "./NotFound";
import Homepage from "./Homepage";
import JobsList from "./JobsList";
import CompaniesList from "./CompaniesList";
import SignupForm from "./Forms/SignupForm";
import LoginForm from "./Forms/LoginForm";
import UserContext from "./UserContext";
import { jwtDecode } from "jwt-decode";
import JoblyApi from "./api";
import EditProfileForm from "./Forms/EditProfileForm";
import PrivateRoute from "./PrivateRouteComponent";  // Import PrivateRoute

function App() {
    const [token, setToken] = useState(localStorage.getItem("jobly-token") || null);
    const [currentUser, setCurrentUser] = useState(null);

    // When the token changes, we reload user info from API
    useEffect(() => {
        async function loadUserInfo() {
            if (token) {
                try {
                    let { username } = jwtDecode(token);  // Decode token to get username
                    JoblyApi.token = token;  // Set token for API requests
                    let currentUser = await JoblyApi.getCurrentUser(username);  // Fetch user details
                    setCurrentUser(currentUser);  // Set the user data
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));  // Store user in localStorage
                } catch (err) {
                    setCurrentUser(null);
                    localStorage.removeItem("currentUser");
                }
            }
        }
        loadUserInfo();
    }, [token]);

    async function signup(signupData) {
        try {
            let token = await JoblyApi.signup(signupData);  // API call to sign up user
            setToken(token);  // Set token in state
            localStorage.setItem("jobly-token", token);  // Store token in localStorage
            return { success: true };
        } catch (errors) {
            console.error("Signup failed", errors);
            return { success: false, errors };
        }
    }

    async function login(loginData) {
        try {
            let token = await JoblyApi.login(loginData);  // API call to log in user
            setToken(token);  // Set token in state
            localStorage.setItem("jobly-token", token);  // Store token in localStorage
            return { success: true };
        } catch (errors) {
            console.error("Login failed", errors);
            return { success: false, errors };
        }
    }

    function logout() {
        setToken(null);  // Remove token in state
        setCurrentUser(null);  // Reset user
        localStorage.removeItem("jobly-token");  // Clear token from localStorage
        localStorage.removeItem("currentUser");  // Clear user info from localStorage
    }

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                    <NavBar logout={logout} />  {/* Pass logout to NavBar */}
                    <main>
                        <Routes>
                            {/* Routes that don't need authentication */}
                            <Route path="/" element={<Homepage />} />
                            <Route path="/signup" element={<SignupForm signup={signup} />} />
                            <Route path="/login" element={<LoginForm login={login} />} />

                            {/* Routes that are protected */}
                            <Route path="/jobs" element={<PrivateRoute><JobsList /></PrivateRoute>} />
                            <Route path="/companies" element={<PrivateRoute><CompaniesList /></PrivateRoute>} />
                            <Route path="/profile" element={<PrivateRoute><EditProfileForm /></PrivateRoute>} />
                            <Route path="/companies/:handle" element={<PrivateRoute><JobsList /></PrivateRoute>} />

                            {/* Catch all route for unknown paths */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;




