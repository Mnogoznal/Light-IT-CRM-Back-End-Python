import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import CurrentYear from './CurrentYear';
import '../css/HomePage.css'; // Импорт файла стилей
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; // Импорт компонента Modal из react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import { faAudible } from '@fortawesome/free-brands-svg-icons';
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import { faMixer } from '@fortawesome/free-brands-svg-icons';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext); // Подключаем только необходимые функции из контекста
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Состояние для модального окна успешной авторизации
    const [showErrorModal, setShowErrorModal] = useState(false); // Состояние для модального окна ошибки авторизации

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password); // Вызываем функцию login из контекста
            setShowSuccessModal(true); // Показываем модальное окно успешной авторизации
        } catch (error) {
            setShowErrorModal(true); // Показываем модальное окно ошибки авторизации
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
                <h1>Login:</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="form-control mb-2" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="form-control mb-2" />
                    <Button type="submit" variant="primary" className="m-2">Login</Button>
                </form>
                <CurrentYear />
            </Container>

            {/* Модальное окно успешной авторизации */}
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have successfully logged in.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSuccessModalClose} href="/">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Модальное окно ошибки авторизации */}
            <Modal show={showErrorModal} onHide={handleErrorModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Incorrect username or password. Please try again.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleErrorModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LoginPage;
