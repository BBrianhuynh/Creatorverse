import React from "react";
import Card from "../components/Card.jsx";

export default function ShowCreators(props) {
  const creators = props.creators;

  return (
    <div>
      <div className="grid-container">
        {creators.map((creator) => (
          <div>
            <Card creator={creator} />
          </div>
        ))}
      </div>
    </div>
  );
}
