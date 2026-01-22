import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const creator = props.creator;

  return (
    <div>
      <h2>{creator.name}</h2>
      <p>{creator.url}</p>
      <p>{creator.description}</p>
      <Link to={`/view-creator/${creator.id}`} className="button-link">
        View
      </Link>
      <Link to={`/edit-creator/${creator.id}`} className="button-link">
        Edit
      </Link>
    </div>
  );
}
