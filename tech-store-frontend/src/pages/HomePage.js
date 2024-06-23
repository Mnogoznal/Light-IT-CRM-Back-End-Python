import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'; // Подключаем компоненты Bootstrap
import AuthContext from '../contexts/AuthContext';
import CurrentYear from './CurrentYear';
import '../css/HomePage.css'; // Импорт файла стилей
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import { faEllo } from '@fortawesome/free-brands-svg-icons';
import { faAudible } from '@fortawesome/free-brands-svg-icons';
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import { faMixer } from '@fortawesome/free-brands-svg-icons';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/">CRM System | Tech</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/"><FontAwesomeIcon icon={faBuffer} /> Home</Nav.Link>
              <Nav.Link href="/orders"><FontAwesomeIcon icon={faAudible} /> Orders</Nav.Link>
              <Nav.Link href="/create-order"><FontAwesomeIcon icon={faBuromobelexperte} /> Create Orders</Nav.Link>
              <Nav.Link href="/clients-order"><FontAwesomeIcon icon={faConnectdevelop} /> Client Orders</Nav.Link>
              <Nav.Link href="/create-client-order"><FontAwesomeIcon icon={faMixer} /> Create New Client Orders</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                <NavDropdown.Item href="/">Test</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">{user && <button onClick={logout}>Logout</button>}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Container className="p-4">
          <div>
            <Alert variant="success">
              <Alert.Heading><FontAwesomeIcon icon={faEllo} /> Welcome, {user ? user.username : 'Guest'}!</Alert.Heading>
              <p>
                Welcome to the system for managing orders from a hardware store!
                For further work, successful authorization or registration in the system is required. Good luck!
              </p>
              <hr />
              <p className="mb-0">
                <FontAwesomeIcon icon={faGratipay} /> After successfully using the system, you can exit using the button in the side menu, or using the button below.
              </p>
              <div className="d-flex justify-content-end">
                <Button onClick={logout} variant="outline-success">
                  Logout
                </Button>
              </div>
            </Alert>
          </div>
          <CurrentYear />
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
