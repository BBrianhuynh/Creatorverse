import React, { useState } from "react";
import { supabase } from "../client.js";

export default function AddCreator({ onAddCreator }) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.name && formData.url && formData.description) {
      try {
        const { error } = await supabase.from("creators").insert([formData]);

        if (error) {
          alert("Error adding creator: " + error.message);
          return;
        }
        // Rerender the page to load new creator without refreshing the page
        onAddCreator(formData);
        setFormData({ name: "", url: "", description: "" });
        alert("Creator added successfully!");
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <div>
      <div>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Url
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
