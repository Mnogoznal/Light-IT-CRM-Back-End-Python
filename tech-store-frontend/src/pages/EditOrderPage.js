import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CurrentYear from './CurrentYear';
import '../css/HomePage.css'; // Импорт файла стилей
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AuthContext from '../contexts/AuthContext'; // Импортируем контекст для аутентификации
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import { faAudible } from '@fortawesome/free-brands-svg-icons';
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import { faMixer } from '@fortawesome/free-brands-svg-icons';

const EditOrderPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [product, setProduct] = useState(null); // Добавляем состояние для продукта
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false); // Добавляем состояние для модального окна
    const { user, logout } = useContext(AuthContext); // Используем контекст для получения user и logout

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/orders/${id}/`, {
                    headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
                });
                setOrder(response.data);
                setStatus(response.data.status);
                
                // Если данные о продукте не включены в заказ, сделайте дополнительный запрос
                if (response.data.product) {
                    const productResponse = await axios.get(`http://127.0.0.1:8000/api/products/${response.data.product}/`, {
                        headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
                    });
                    setProduct(productResponse.data);
                }
            } catch (error) {
                console.error('Error fetching order:', error);
                setError('Failed to fetch order. Please try again.');
            }
        };

        fetchOrder();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://127.0.0.1:8000/api/orders/${id}/`, { status }, {
                headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
            });
            // Устанавливаем новый статус в локальный state после успешного обновления
            setOrder({ ...order, status });
            // Показать модальное окно об успешном обновлении
            setShowModal(true);
        } catch (error) {
            console.error('Error updating order:', error);
            setError('Failed to update order. Please try again.');
        }
    };

    if (!user) {
        return <p>Please log in to edit orders.</p>;
    }

    if (!order) {
        return <p>Loading...</p>;
    }

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
                <h1>Edit Order № {order.id}</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <h3>Product: {product ? product.name : 'Loading product...'}</h3>
                <form onSubmit={handleSubmit}>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Select status:</Form.Label>
                        <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="new">New</option>
                            <option value="processed">Processed</option>
                            <option value="completed">Completed</option>
                            <option value="paid">Paid</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="m-3">Update Order</Button>
                </form>
                <CurrentYear />
            </Container>

            {/* Модальное окно */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The order has been successfully updated.</p>
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

export default EditOrderPage;
