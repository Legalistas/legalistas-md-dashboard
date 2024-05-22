export const login = async (email, password) => {
    const response = await fetch('https://api.legalistas.com.ar/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Error en la autenticación');
    }

    const data = await response.json();
    return data;
};
