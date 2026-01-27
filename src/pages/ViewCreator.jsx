import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client.js";
import { Link } from "react-router-dom";

export default function ViewCreator({ creators, onDeleteCreator }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const creator = creators.find((c) => c.id === parseInt(id));

  const handleDelete = async () => {
    if (window.confirm("Delete this creator?")) {
      try {
        const { error } = await supabase.from("creators").delete().eq("id", id);

        if (error) {
          alert("Error deleting creator: " + error.message);
          return;
        }

        onDeleteCreator(parseInt(id));
        alert("Creator removed successfully!");
        navigate("/");
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  if (!creator) return <div>Creator not found</div>;

  return (
    <div>
      <h2>{creator.name}</h2>
      <p>{creator.url}</p>
      <p>{creator.description}</p>
      <Link to={`/edit-creator/${creator.id}`} className="button-link">
        Edit
      </Link>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
