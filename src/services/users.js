import axios from 'axios';

export const getCuscomers = async () => {
    try {
        const response = await axios.get(`https://api.legalistas.com.ar/v1/customer`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching customers: `, error);
        throw error;
    }
};


export const updateCuscomer = async (cuscomer) => {
    try {
        const response = await axios.put(`https://api.legalistas.com.ar/v1/customer/${cuscomer.id}`, cuscomer);
        return response.data;
    } catch (error) {
        console.error(`Error updating customer: `, error);
        throw error;
    }
};

export const deleteCuscomer = async (cuscomer) => {
    try {
        const response = await axios.delete(`https://api.legalistas.com.ar/v1/customer/${cuscomer.id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting customer: `, error);
        throw error;
    }
};

export const getStateLocality = async ({ state, locality }) => {
    try {
        const response = await axios.get(`​https://api.legalistas.com.ar/v1/settings`);
        const data = response.data;

        const stateName = data.states.find(s => s.id === state)?.name;
        const localityName = data.localities.find(l => l.state_id === state && l.id === locality)?.name;

        return { stateName, localityName };
    } catch (error) {
        console.error(`Error fetching state-locality: `, error);
        throw error;
    }
}

export const getTeams = async () => {
    // http://api.legalistas.com.ar/v1/api/teams
    try {
        const response = await axios.get(`https://api.legalistas.com.ar/v1/api/teams`);
        const filtered = response.data.map(t => ({ id: t.id, name: t.name }));
        return filtered;
    } catch (error) {
        console.error(`Error fetching teams: `, error);
        throw error;
    }
}

// http://api.legalistas.com.ar/v1/user
export const getUsers = async (team) => {
    try {
        const response = await axios.get(`https://api.legalistas.com.ar/v1/user`);
        return response.data.users;
    } catch (error) {
        console.error(`Error fetching users: `, error);
        throw error;
    }
}