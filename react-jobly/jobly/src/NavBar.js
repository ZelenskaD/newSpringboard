import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import './Styles/NavBar.css';
import UserContext from "./UserContext";  // Correct the import

function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext);

    return (
        <div>
            <Navbar expand="md" className="navbar-custom">
                <NavLink to="/" className="navbar-brand">
                    Jobly
                </NavLink>

                <Nav className="nav" navbar>
                    {currentUser ? (
                        <>
                            <NavItem>
                                <NavLink to="/companies" className="nav-link">
                                    Companies
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/jobs" className="nav-link">
                                    Jobs
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/profile" className="nav-link">  {/* Add link to Profile */}
                                    Profile
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/" onClick={logout} className="nav-link">
                                    Log out  {currentUser.firstName || currentUser.username}
                                </NavLink>
                            </NavItem>
                        </>
                    ) : (
                        <>
                            <NavItem>
                                <NavLink to="/login" className="nav-link">
                                    Login
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/signup" className="nav-link">
                                    Sign Up
                                </NavLink>
                            </NavItem>
                        </>
                    )}
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;


