import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
        axios.get('http://127.0.0.1:8000/api/auth/user/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            setUser(null);
        });
    }
}, []);


    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', { username, password });
            const { key } = response.data;
            localStorage.setItem('authToken', key);

            // Получение данных пользователя после успешного логина
            const userResponse = await axios.get('http://127.0.0.1:8000/api/auth/user/', {
                headers: {
                    Authorization: `Token ${key}`
                }
            });

            const userData = userResponse.data;
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            console.log('Auth successful!', userResponse.data);
        } catch (error) {
            console.error('Error during login:', error);
            setUser(null);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
