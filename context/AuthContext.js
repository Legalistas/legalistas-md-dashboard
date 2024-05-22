import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Recuperar los datos del usuario de localStorage cuando la aplicación se carga
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post('https://api.legalistas.com.ar/api/v1/login', { email, password });
            if (response.data) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data)); // Guardar en localStorage
            } else {
                console.log('Response data is null');
            }
        } catch (error) {
            setError(error.response ? error.response.data : 'Network Error');
        } finally {
            setLoading(false);
            router.push("/")
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remover de localStorage
    };

    useEffect(() => {
        console.log(user); // Verificar los cambios en el estado de user
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);