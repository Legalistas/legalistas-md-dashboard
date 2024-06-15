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