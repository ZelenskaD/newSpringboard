import React, { useContext, useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "./UserContext";
import "./Styles/PrivateRoute.css"

function PrivateRoute({ children }) {
    const { currentUser } = useContext(UserContext);
    const [flashMessage, setFlashMessage] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (!currentUser) {
            // Show flash message if the user is not logged in
            setFlashMessage("You must log in or sign up to access this page.");

            // Set a timer to redirect the user after 3 seconds
            const timer = setTimeout(() => {
                setRedirect(true); // Trigger the redirect
            }, 4000);

            return () => clearTimeout(timer);  // Clean up timer on unmount
        }
    }, [currentUser]);

    // If redirect is true, navigate to the login page
    if (redirect) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // If the user is logged in, allow access to the child component (protected route)
    if (currentUser) {
        return children;
    }

    // Display flash message before redirect
    return (
        <div>
            {flashMessage && <div className="flash-message">{flashMessage}</div>}
        </div>
    );
}

export default PrivateRoute;

