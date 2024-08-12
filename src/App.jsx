import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Banner from './Compoenets/Banner';
import Dashboard from './Compoenets/Dashboard';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className='px-5'>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="me-auto">
          Vashkarjya
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Container className="mt-4 p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <h1>Welcome to Vashkarjya's Project!</h1>
<p>
  Manage and customize the banner through the Dashboard. Here you can toggle the banner's visibility, update its description, set the countdown timer, and specify a link for more details. 
</p>


              </>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;