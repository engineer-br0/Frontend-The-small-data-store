import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import AddEditCitizenForm from "./CitizenForm";

const CitizenList = ({ citizens, onUpdate, onDelete }) => {
  const [editingCitizen, setEditingCitizen] = useState(null);

  const handleUpdateClick = (citizen) => {
    setEditingCitizen(citizen);
  };

  const handleUpdateSubmit = (updatedData) => {
    onUpdate(editingCitizen._id, updatedData);
    setEditingCitizen(null);
  };

  return (
    <>
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
          {citizens.map((citizen) => (
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
