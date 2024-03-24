import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import AddEditCitizenForm from "./CitizenForm";

const CitizenList = ({ citizens, onUpdate, onDelete }) => {
  const [editingCitizen, setEditingCitizen] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");

  const handleUpdateClick = (citizen) => {
    setEditingCitizen(citizen);
  };

  const handleUpdateSubmit = (updatedData) => {
    onUpdate(editingCitizen._id, updatedData);
    setEditingCitizen(null);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFilterCriteriaChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const filteredCitizens = citizens
    .filter((citizen) => {
      const fullName = `${citizen.firstName} ${citizen.lastName}`.toLowerCase();
      return fullName.includes(searchInput.toLowerCase());
    })
    .filter((citizen) => {
      if (filterCriteria === "") {
        return true;
      }
      return citizen.gender === filterCriteria;
    });

  return (
    <>
      <Form>
        <Form.Group controlId="searchInput">
          <Form.Label>Search by name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </Form.Group>
        <Form.Group controlId="filterCriteria">
          <Form.Label>Filter by gender:</Form.Label>
          <Form.Control
            as="select"
            value={filterCriteria}
            onChange={handleFilterCriteriaChange}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCitizens.map((citizen) => (
            <tr key={citizen._id}>
              <td>{citizen.firstName}</td>
              <td>{citizen.lastName}</td>
              <td>{citizen.dateOfBirth.split("T")[0]}</td>
              <td>{citizen.gender}</td>
              <td>{citizen.address}</td>
              <td>{citizen.city}</td>
              <td>{citizen.state}</td>
              <td>{citizen.pincode}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleUpdateClick(citizen)}
                >
                  Update
                </Button>
                <Button variant="danger" onClick={() => onDelete(citizen._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {editingCitizen && (
        <AddEditCitizenForm
          onSubmit={handleUpdateSubmit}
          initialValues={editingCitizen}
        />
      )}
    </>
  );
};

export default CitizenList;
