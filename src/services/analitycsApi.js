import axios from 'axios';

// Configuración base de axios
const api = axios.create({
    baseURL: 'https://api.legalistas.com.ar/v1/statistics/crm'
});

// Función para obtener datos sin parámetros
export const getCrmData = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching CRM data:', error);
        throw error;
    }
};

// Función para obtener datos por año
export const getCrmDataByYear = async (year) => {
    try {
        const response = await api.get(`/?year=${year}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching CRM data for year ${year}:`, error);
        throw error;
    }
};

// Función para obtener datos por múltiples años
export const getCrmDataByYears = async (years) => {
    try {
        const response = await api.get(`/?year=${years.join(',')}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching CRM data for years ${years.join(',')}:`, error);
        throw error;
    }
};

// Función para obtener datos por año y mes
export const getCrmDataByYearAndMonth = async (year, month) => {
    try {
        const response = await api.get(`/?year=${year}&month=${month}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching CRM data for year ${year} and month ${month}:`, error);
        throw error;
    }
};

// Función para obtener datos por año y múltiples meses
export const getCrmDataByYearAndMonths = async (year, months) => {
    try {
        const response = await api.get(`/?year=${year}&month=${months.join(',')}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching CRM data for year ${year} and months ${months.join(',')}:`, error);
        throw error;
    }
};

// Función para obtener datos por año y vendedor
export const getCrmDataByYearAndSeller = async (year, sellerId) => {
    try {
        const response = await api.get(`/?year=${year}&sellerId=${sellerId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching CRM data for year ${year} and seller ${sellerId}:`, error);
        throw error;
    }
};

// Función para obtener datos por año, mes y vendedor
export const getCrmDataByYearMonthAndSeller = async (year, month, sellerId) => {
    try {
        const response = await api.get(`/?year=${year}&month=${month}&sellerId=${sellerId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching CRM data for year ${year}, month ${month} and seller ${sellerId}:`, error);
        throw error;
    }
};

// Función para obtener datos por año, múltiples meses y vendedor
export const getCrmDataByYearMonthsAndSeller = async (year, months, sellerId) => {
    try {
        const response = await api.get(`/?year=${year}&month=${months.join(',')}&sellerId=${sellerId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching CRM data for year ${year}, months ${months.join(',')} and seller ${sellerId}:`, error);
        throw error;
    }
};

// Función para obtener datos por múltiples años y vendedor
export const getCrmDataByYearsAndSeller = async (years, sellerId) => {
    try {
        const response = await api.get(`/?year=${years.join(',')}&sellerId=${sellerId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching CRM data for years ${years.join(',')} and seller ${sellerId}:`, error);
        throw error;
    }
};

// Función para obtener datos de los vendedores por año y mes específico
export const getSellerDataByYearAndMonth = async (year, month) => {
    try {
        const response = await api.get(`/seller?year=${year}&month=${month}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching seller data for year ${year} and month ${month}:`, error);
        throw error;
    }
};

// Función para obtener datos de los vendedores por año
export const getSellerDataByYear = async (year) => {
    try {
        console.log(year)
        const response = await api.get(`/seller?year=${year}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching seller data for year ${year}:`, error);
        throw error;
    }
};
