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

export const create_opportunity = async (opportunity) => {
    const response = await fetch('https://api.legalistas.com.ar/v1/crm/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( opportunity ),
    });

    if (!response.ok) {
        throw new Error('Error al crear la oportunidad.');
    }

    const data = await response.json();
    return data;
};

