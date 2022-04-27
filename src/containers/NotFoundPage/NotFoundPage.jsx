import React from "react";
import "./not-found-page.scss";
import { Link } from "react-router-dom";
import { NotFoundIcon } from "../../assets/icons";

const NotFoundPage = () => {
  return (
    <div className="not-found-component">
      <NotFoundIcon />
      <div className="message-box">
        <h1 className="text-primary">404</h1>
        <p className="text-primary">Page not found</p>
        <Link className="btn back-button" to="/profile">
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
