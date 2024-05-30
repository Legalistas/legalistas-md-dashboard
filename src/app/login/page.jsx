'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
        } catch (error) {
            console.error('Error en la autenticación:', error);
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}
