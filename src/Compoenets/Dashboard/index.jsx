import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    description: '',
    is_visible: true,
    timer: 0,
    link: '',
  });

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/banner`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error fetching banner data:', error));
  }, [apiUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/api/banner`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update banner');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Banner updated:', data);
        alert('Banner updated successfully!');
      })
      .catch((error) => console.error('Error updating banner:', error));
  };

  return (
    <Container>
      <h2>Dashboard</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formVisible">
          <Form.Check
            type="checkbox"
            label="Visible"
            name="is_visible"
            checked={formData.is_visible}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTimer">
          <Form.Label>Timer (seconds):</Form.Label>
          <Form.Control
            type="number"
            name="timer"
            value={formData.timer}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formLink">
          <Form.Label>Link:</Form.Label>
          <Form.Control
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Update Banner
        </Button>
      </Form>
    </Container>
  );
};

export default Dashboard;
