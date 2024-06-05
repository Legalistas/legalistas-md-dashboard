
export const login = async (email, password = "", accessToken = "") => {
    const response = await fetch('https://api.legalistas.com.ar/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, accessToken }),
    });

    if (!response.ok) {
        return response
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
        body: JSON.stringify(opportunity),
    });

    if (!response.ok) {
        throw new Error('Error al crear la oportunidad.');
    }

    const data = await response.json();
    return data;
};

export const change_to_google = async (user, email, google_access_token) => {
    console.log(user, email, google_access_token)
    const response = await fetch(`https://api.legalistas.com.ar/v1/customer/${user}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, google_access_token }), // Ensure to pass an object for JSON.stringify
    });
    if (response.ok) {
        console.log("Cuenta de Google vinculada y actualizada correctamente.");
    } else {
        console.error("Error al actualizar la cuenta de Google:", response.statusText);
    }
};