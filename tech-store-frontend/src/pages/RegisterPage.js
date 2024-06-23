import React, { useState } from 'react';
import axios from 'axios';
import CurrentYear from './CurrentYear';
import '../css/HomePage.css'; // Импорт файла стилей
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; // Импорт компонента Modal из react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import { faAudible } from '@fortawesome/free-brands-svg-icons';
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import { faMixer } from '@fortawesome/free-brands-svg-icons';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Состояние для модального окна успешной регистрации
    const [showErrorModal, setShowErrorModal] = useState(false); // Состояние для модального окна ошибки регистрации

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Проверяем совпадение паролей
        if (password1 !== password2) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/registration/', { username, email, password1, password2 });
            console.log('Registration successful:', response.data);
            // Показываем модальное окно успешной регистрации
            setShowSuccessModal(true);
            // Очищаем поля после успешной регистрации
            setUsername('');
            setEmail('');
            setPassword1('');
            setPassword2('');
            setError('');
        } catch (error) {
            console.error('Error registering:', error);
            setError('Failed to register. Please try again.');
            // Показываем модальное окно ошибки регистрации
            setShowErrorModal(true);
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
    };

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
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="p-4">
                <h1>Register:</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" required/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password1} onChange={(e) => setPassword1(e.target.value)} type="password" placeholder="Password" required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="Repeat Password" required/>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="m-2">
                        Register
                    </Button>
                </Form>
                <CurrentYear />
            </Container>

            {/* Модальное окно успешной регистрации */}
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Successful!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have successfully registered.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSuccessModalClose} href="/login">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Модальное окно ошибки регистрации */}
            <Modal show={showErrorModal} onHide={handleErrorModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleErrorModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegisterPage;
