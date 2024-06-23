import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CurrentYear from './CurrentYear';
import '../css/HomePage.css'; // Импорт файла стилей
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import AuthContext from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import { faEllo } from '@fortawesome/free-brands-svg-icons';
import { faAudible } from '@fortawesome/free-brands-svg-icons';
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import { faMixer } from '@fortawesome/free-brands-svg-icons';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10); // Количество заказов на странице
    const [sortOrder, setSortOrder] = useState('asc'); // Состояние для направления сортировки
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/orders/', {
                    headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
                });
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
                // Handle error
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products/', {
                    headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (user) {
            fetchOrders();
            fetchProducts();
        }
    }, [user]);

    const findProductNameById = (productId) => {
        const product = products.find(product => product.id === productId);
        return product ? product.name : 'Unknown Product';
    };

    // Определение класса для Badge в зависимости от статуса заказа
    const getBadgeVariant = (status) => {
        switch (status) {
            case 'new':
                return 'warning';
            case 'processed':
                return 'info';
            case 'completed':
                return 'success';
            case 'paid':
                return 'danger';
            default:
                return 'secondary'; // Если статус неизвестен, можно использовать другой фон
        }
    };

    // Форматирование даты и времени
    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('ru-RU', options);
    };

    // Функция для сортировки заказов по дате
    const sortOrdersByDate = () => {
        const sortedOrders = [...orders].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setOrders(sortedOrders);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Функция для фильтрации заказов по диапазону дат
    const filterOrdersByDate = () => {
        let filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.created_at);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            if (start && end) {
                return orderDate >= start && orderDate <= end;
            } else if (start) {
                return orderDate >= start;
            } else if (end) {
                return orderDate <= end;
            }
            return true; // Если не указаны даты, возвращаем все заказы
        });
        setOrders(filteredOrders);
    };

    // Получение текущих заказов на странице
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Пагинация - изменение текущей страницы
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!user) {
        return <p>Please log in to view orders.</p>;
    }

    if (loading) {
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
                <h1>Orders:</h1>
                <Button variant="primary" href="/create-order" className="ms-3">Create Order</Button>
                <div className="m-3">
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">Start Date:</label>
                        <input type="date" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">End Date:</label>
                        <input type="date" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>
                <Button variant="primary" onClick={filterOrdersByDate} className="m-3">Filter by Date</Button>
                <Button variant="secondary" onClick={() => { setStartDate(''); setEndDate(''); setOrders(orders); }} className="m-3">Clear Filters</Button>
                {currentOrders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div className="p-4">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Order Status</th>
                                    <th>
                                        Order Created Date
                                        <Button variant="link" onClick={sortOrdersByDate}>
                                            Sort
                                        </Button>
                                    </th>
                                    <th>Edit Order</th>
                                    <th>Order Receipt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{findProductNameById(order.product)}</td>
                                        <td><Badge bg={getBadgeVariant(order.status)}>{order.status}</Badge></td>
                                        <td>{formatDateTime(order.created_at)}</td>
                                        <td><Button variant="primary" href={`/edit-order/${order.id}`}>Edit</Button></td>
                                        <td><Button variant="warning" href={`/order-receipt/${order.id}`}>Receipt</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
                {/* Пагинация */}
                <Pagination className="mt-4">
                    {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
                <CurrentYear />
            </Container>
        </div>
    );
};

export default OrdersPage;
