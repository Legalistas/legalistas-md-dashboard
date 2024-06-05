"use client"
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../services/api';
import { signOut } from 'next-auth/react';

const AuthContext = createContext();

const logout = () => {
    signOut();
};

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

    const signIn = async (email, password, token) => {
        const response = await login(email, password, token);
        if (response && response.token) {
            setUser(response);
            localStorage.setItem('user', JSON.stringify(response));
            router.push('/');
        }
    };

    const signOut = async () => {
        router.push('/auth/signin');
        logout();
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
