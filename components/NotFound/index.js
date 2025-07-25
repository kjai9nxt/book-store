import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-heading">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-description">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;