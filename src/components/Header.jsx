import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1> Creatorverse </h1>
        <Link to="/" className="button-link">
          View All Creators
        </Link>
        <Link to="/add-creator" className="button-link">
          Add a creator
        </Link>
      </div>
    </div>
  );
}
