import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'; // Подключаем компоненты Bootstrap
import CurrentYear from './CurrentYear';
import '../css/HomePage.css'; // Импорт файла стилей
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const NotFoundPage = () => {
    return (
        <div>
            <Container className="p-4">
                <h1>404 - Page Not Found!</h1>
                <p>The page you are looking for does not exist.</p>

                <Button variant="info" href="/" className="m-2">Back Home</Button>
                <CurrentYear />
            </Container>
        </div>
    );
};

export default NotFoundPage;
