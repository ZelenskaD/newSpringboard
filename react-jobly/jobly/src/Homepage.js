import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";

import "./Styles/Homepage.css";

function Homepage() {
    const { currentUser } = useContext(UserContext);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (currentUser) {
            // Fetch the applied jobs for the current user from localStorage
            const appliedJobsForUser = JSON.parse(localStorage.getItem(`appliedJobs-${currentUser.username}`)) || [];

            if (appliedJobsForUser.length > 0) {
                // Fetch job details for applied jobs
                const fetchAppliedJobs = async () => {
                    try {
                        const promises = appliedJobsForUser.map(jobId =>
                            axios.get(`http://localhost:3001/jobs/${jobId}`)
                        );
                        const jobResults = await Promise.all(promises);
                        console.log("Job results:", jobResults.map(res => res.data.job));

                        setJobs(jobResults.map(res => res.data.job));
                    } catch (err) {
                        console.error("Failed to fetch applied jobs:", err);
                    }
                };
                fetchAppliedJobs();
            }
        }
    }, [currentUser]);

    return (
        <div>
            {currentUser ? (
                <div className="greetings">
                    <h1>Welcome back, {currentUser.firstName || currentUser.username}!</h1>
                </div>
            ) : (
                <div className="greetings">
                    <h1>Welcome to Jobly!</h1>
                    <div className="button-container">
                        <Link to="/login" className="nav-link-log">Login</Link>
                        <Link to="/signup" className="nav-link-log">Sign Up</Link>
                    </div>
                </div>
            )}

            {currentUser && (
                <>
                    <h2 className="applied-jobs">Jobs You've Applied To</h2>
                    {jobs.length > 0 ? (
                        <div className="applied-jobs-list">
                            {jobs.map(job => (
                                <div key={job.id} className="applied-job">
                                    <h3>{job.title}</h3>
                                    <p>{job.company ? job.company.name : "Unknown"}</p>
                                    <p>Salary: {job.salary || "Not provided"}</p>
                                    <p>Equity: {job.equity}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="flash-message">You haven't applied to any jobs yet.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Homepage;





