// context/AuthContext.js
import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post('https://api.legalistas.com.ar/api/v1/login', { email, password });
            // setUser(response.data); y esto es por que no estoy seguro si en algun momento deja de funcar lo de abajo

            // Esto y el if guarda en la cache del navegador al usuario y en user :D
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                console.log(localStorage.getItem('user'));
            }
            setError(null);

            router.push("/")
        } catch (error) {
            setError(error.response ? error.response.data : 'Network Error');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
