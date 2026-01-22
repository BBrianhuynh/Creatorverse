import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../client.js";

export default function EditCreator({
  creators,
  onUpdateCreator,
  onDeleteCreator,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const creator = creators.find((c) => c.id === parseInt(id));
  const [formData, setFormData] = useState(creator || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdateCreator(formData);
    alert("Creator information updated");
    navigate("/");
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this creator?:")) {
      try {
        const { error } = await supabase.from("creators").delete().eq("id", id);
        if (error) {
          alert("Error deleting creator: ", error.message);
          return;
        }
        onDeleteCreator(parseInt(id));
        alert("Creator is successfully deleted");
        navigate("/");
      } catch (err) {
        alert("Error ", err.message);
      }
    }
  };

  if (!creators) return <div>Creator not found</div>;

  return (
    <div>
      <div>
        <p>Name</p>
        <input
          type="text"
          name="name"
          defaultValue={creator.name}
          onChange={handleChange}
        />
        <p>Url</p>
        <input
          type="text"
          name="url"
          defaultValue={creator.url}
          onChange={handleChange}
        />
        <p>Description</p>
        <input
          type="text"
          name="description"
          defaultValue={creator.description}
          onChange={handleChange}
        />
        <div>
          <button
            type="button"
            className="button-submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="button-delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
