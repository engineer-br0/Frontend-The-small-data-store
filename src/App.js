import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import axios from "axios";
import CitizenList from "./components/CitizenList";
import AddEditCitizenForm from "./components/CitizenForm";

function App() {
  const [citizens, setCitizens] = useState([]);

  useEffect(() => {
    fetchCitizens();
  }, []);

  const fetchCitizens = async () => {
    try {
      const response = await axios.get(
        "https://backend-the-small-data-store.onrender.com/citizens"
      );
      setCitizens(response.data);
    } catch (error) {
      console.error("Error fetching citizens:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const apiUrl = formData._id
        ? `https://backend-the-small-data-store.onrender.com/citizens/${formData._id}`
        : "https://backend-the-small-data-store.onrender.com/citizens";
      const method = formData._id ? "PUT" : "POST";
      const response = await axios({
        method: method,
        url: apiUrl,
        data: formData,
      });
      console.log("Form submitted successfully:", response.data);
      fetchCitizens(); // Refresh citizen list
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleUpdate = async (citizenId, updatedData) => {
    try {
      const response = await axios.put(
        `https://backend-the-small-data-store.onrender.com/citizens/${citizenId}`,
        updatedData
      );
      console.log("Citizen updated successfully:", response.data);
      fetchCitizens(); // Refresh citizen list
    } catch (error) {
      console.error("Error updating citizen:", error);
    }
  };

  const handleDelete = async (citizenId) => {
    try {
      const response = await axios.delete(
        `https://backend-the-small-data-store.onrender.com/citizens/${citizenId}`
      );
      console.log("Citizen deleted successfully:", response.data);
      fetchCitizens(); // Refresh citizen list
    } catch (error) {
      console.error("Error deleting citizen:", error);
    }
  };

  return (
    <Router>
      <Container>
        <Nav className="mt-3 mb-3">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/add">
              Add Citizen
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <CitizenList
                citizens={citizens}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            }
          />
          <Route
            exact
            path="/add"
            element={<AddEditCitizenForm onSubmit={handleSubmit} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
