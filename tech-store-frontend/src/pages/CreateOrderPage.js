import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentYear from './CurrentYear';
import '../css/HomePage.css'; // Импорт файла стилей
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import { faAudible } from '@fortawesome/free-brands-svg-icons';
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import { faMixer } from '@fortawesome/free-brands-svg-icons';

const CreateOrderPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products/', {
                    headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle error (e.g., show error message to user)
            }
        };

        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем, что выбран продукт
        if (!selectedProduct) {
            setError('Please select a product');
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/orders/', { product: selectedProduct }, {
                headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
            });
            // Очищаем выбранный продукт после успешного создания заказа
            setSelectedProduct('');
            setError('');
            setShowModal(true); // Показываем модальное окно
        } catch (error) {
            console.error('Error creating order:', error);
            setError('Failed to create order. Please try again.');
            // Handle error (e.g., show error message to user)
        }
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
                <h1>Create Order</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <Form.Group controlId="formProduct">
                        <Form.Label>Select a product:</Form.Label>
                        <Form.Control as="select" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                            <option value="">Select a product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="m-3">Create Order</Button>
                </form>
                <CurrentYear />
            </Container>

            {/* Модальное окно для отображения сообщения о создании заказа */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Created</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your order has been successfully created.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)} href="/orders">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateOrderPage;
