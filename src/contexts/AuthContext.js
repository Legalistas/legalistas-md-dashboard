"use client"
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(localStorage.getItem('user'));
        }
        setLoading(false);
    }, []);

    const signIn = async (email, password) => {
        const response = await login(email, password);
        if (response && response.token) {
            setUser(response);
            localStorage.setItem('user', JSON.stringify(response));
            router.push('/');
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/auth/signin');
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
