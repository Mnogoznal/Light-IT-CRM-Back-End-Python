import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext'; // Импортируем контекст для аутентификации
import Container from 'react-bootstrap/Container';
import '../css/HomePage.css'; // Импорт файла стилей
import Button from 'react-bootstrap/Button';

const OrderReceipt = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [product, setProduct] = useState(null); // Добавляем состояние для продукта
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext); // Используем контекст для получения user

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/orders/${id}/`, {
                    headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
                });
                setOrder(response.data);
                
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

    if (!user) {
        return <p>Please log in to view the receipt.</p>;
    }

    if (!order || !product) {
        return <p>Loading...</p>;
    }

    // Calculate discount if product was created more than one month ago
    const createdDate = new Date(product.created_at);
    const currentDate = new Date();
    const isDiscounted = (currentDate - createdDate) / (1000 * 60 * 60 * 24) > 30;
    const discount = isDiscounted ? 0.2 : 0;
    const price = parseFloat(product.price); // Преобразование строки в число
    const finalPrice = price * (1 - discount);

    const handlePrint = () => {
        window.print();
    };

    return (
        <Container className="receipt-container p-4">
            <h1>Order Receipt</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p><strong>Product Name:</strong> {product.name}</p>
            <p><strong>Product ID:</strong> {product.id}</p>
            <p><strong>Order Created At:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
            <p><strong>Order Updated At:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
            <p><strong>Original Price:</strong> ${price.toFixed(2)}</p>
            {isDiscounted && <p><strong>Discount:</strong> 20%</p>}
            <p><strong>Final Price:</strong> ${finalPrice.toFixed(2)}</p>
            <Button variant="primary" onClick={handlePrint} className="m-2">Print</Button>
            <Button variant="danger" href="/orders" className="m-2">Back to Orders</Button>
        </Container>
    );
};

export default OrderReceipt;
