import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import ShowCreators from "./pages/ShowCreators.jsx";
import AddCreator from "./pages/AddCreator.jsx";
import EditCreator from "./pages/EditCreator.jsx";
import ViewCreator from "./pages/ViewCreator.jsx";
import supabase from "./client.js";

function App() {
  const [creators, setCreators] = useState([]);
  const handleAddCreator = (newCreator) => {
    setCreators([...creators, { ...newCreator, id: Date.now() }]);
  };
  const handleUpdateCreator = (updatedCreator) => {
    setCreators(
      creators.map((c) => (c.id === updatedCreator.id ? updatedCreator : c)),
    );
  };

  const handleDeleteCreator = (deleteId) => {
    setCreators(creators.filter((c) => c.id !== deleteId));
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase.from("creators").select("*");
      if (error) throw error;
      setCreators(data);
    } catch (err) {
      console.error("Error fetching creators: ", err.message);
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ShowCreators creators={creators} />} />
        <Route
          path="/view-creator/:id"
          element={
            <ViewCreator
              creators={creators}
              onDeleteCreator={handleDeleteCreator}
            />
          }
        />
        <Route
          path="/add-creator"
          element={<AddCreator onAddCreator={handleAddCreator} />}
        />
        <Route
          path="/edit-creator/:id"
          element={
            <EditCreator
              creators={creators}
              onUpdateCreator={handleUpdateCreator}
              onDeleteCreator={handleDeleteCreator}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
