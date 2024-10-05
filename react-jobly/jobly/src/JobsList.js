import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";  // Import to get company handle from the URL
import "./Styles/CardsStyle.css";

function JobsList() {
    const { handle } = useParams();  // Get the company handle from the URL, if any
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [appliedJobs, setAppliedJobs] = useState({});  // Track applied jobs

    useEffect(() => {
        // Get the current user to retrieve their applied jobs
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            console.error("User is not logged in.");
            return;
        }

        // Load applied jobs for the current user from localStorage
        const savedAppliedJobs = JSON.parse(localStorage.getItem(`appliedJobs-${currentUser.username}`)) || [];
        const appliedJobsMap = savedAppliedJobs.reduce((acc, jobId) => {
            acc[jobId] = true;
            return acc;
        }, {});
        setAppliedJobs(appliedJobsMap);

        // Fetch jobs from the API
        const endpoint = handle
            ? `http://localhost:3001/companies/${handle}`  // Note: no /jobs here
            : `http://localhost:3001/jobs`;

        axios.get(endpoint)
            .then(response => {
                const jobsData = handle ? response.data.company.jobs : response.data.jobs;
                setJobs(jobsData);
                setLoading(false);
            })
            .catch(err => {
                setError("Unable to fetch jobs.");
                setLoading(false);
            });
    }, [handle]);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleApply = (jobId) => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            console.error("User is not logged in or currentUser is null.");
            return;
        }

        const token = localStorage.getItem("jobly-token");
        if (!token) {
            console.error("No token found, user is not authenticated.");
            return;
        }

        axios.post(`http://localhost:3001/users/${currentUser.username}/jobs/${jobId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                // Mark the job as applied and update localStorage
                setAppliedJobs(prevState => ({
                    ...prevState,
                    [jobId]: true
                }));

                const appliedJobsForUser = JSON.parse(localStorage.getItem(`appliedJobs-${currentUser.username}`)) || [];
                if (!appliedJobsForUser.includes(jobId)) {
                    appliedJobsForUser.push(jobId);
                    localStorage.setItem(`appliedJobs-${currentUser.username}`, JSON.stringify(appliedJobsForUser));
                }
            })
            .catch(err => {
                console.error("Failed to apply for the job:", err);
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="page-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for jobs..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="form-control"
                />
                <button className="btn-primary">Submit</button>
            </div>

            <div className="card-list">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div className="card" key={job.id}>
                            <div>
                                <h5 className="card-title">{job.title}</h5>
                                <p className="card-text">Salary: {job.salary || "Information not provided"}</p>
                                <p className="card-text">Equity: {job.equity}</p>
                                {!handle && (
                                    <p className="card-text">Company: {job.companyHandle}</p>
                                )}
                            </div>
                            <button
                                className={`btn ${appliedJobs[job.id] ? "btn-applied" : "btn-apply"}`}
                                onClick={() => handleApply(job.id)}
                                disabled={appliedJobs[job.id]}  // Disable button if already applied
                            >
                                {appliedJobs[job.id] ? "Applied" : "Apply"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>
        </div>
    );
}

export default JobsList;

