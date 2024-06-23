import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CurrentYear from './CurrentYear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import { faAudible } from '@fortawesome/free-brands-svg-icons';
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import { faMixer } from '@fortawesome/free-brands-svg-icons';

const CreateClientOrderPage = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Проверка на пустые поля
        if (!productName || !productPrice) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            // Создание нового продукта
            const newProduct = {
                name: productName,
                price: productPrice,
                created_at: new Date().toISOString().slice(0, 19)
            };

            await axios.post('http://127.0.0.1:8000/api/products/', newProduct, {
                headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
            });
            setModalMessage('Product successfully created!');
            setShowModal(true);
            setProductName('');
            setProductPrice('');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
                <h1>Create New Client Product:</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="productName">
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="productPrice">
                        <Form.Label>Product Price:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter product price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="m-3">
                        Create Product
                    </Button>
                </Form>
                <CurrentYear />
            </Container>

            {/* Модальное окно после успешного создания продукта */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateClientOrderPage;
