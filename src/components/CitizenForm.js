import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const AddEditCitizenForm = ({ onSubmit, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {});

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div>
      <h2>{initialValues ? "Edit Citizen" : "Add Citizen"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="pincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="text"
            name="pincode"
            value={formData.pincode || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {initialValues ? "Update" : "Add"} Citizen
        </Button>
      </Form>
    </div>
  );
};

export default AddEditCitizenForm;
