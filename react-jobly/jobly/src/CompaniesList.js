import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CompaniesList() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const endpoint = `http://localhost:3001/companies`;

        axios.get(endpoint)
            .then(response => {
                setCompanies(response.data.companies);
                setLoading(false);
            })
            .catch(err => {
                setError("Unable to fetch companies.");
                setLoading(false);
            });
    }, [searchQuery]);


    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="page-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for companies..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="form-control"
                />
                <button className="btn-primary">Submit</button>
            </div>

            <div className="card-list">
                {filteredCompanies.length > 0 ? (
                    filteredCompanies.map(company => (
                        // Link wraps the entire card, making it clickable
                        <Link to={`/companies/${company.handle}`} key={company.handle} className="card-link">
                            <div className="card">
                                <div>
                                    <h5 className="card-title">{company.name}</h5>
                                    <p className="card-text">{company.description}</p>
                                </div>
                                <img
                                    src={company.logoUrl || "https://via.placeholder.com/150"}
                                    className="card-img-top"
                                    alt={`${company.name} logo`}
                                />
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No companies found.</p>
                )}
            </div>
        </div>
    );
}

export default CompaniesList;


