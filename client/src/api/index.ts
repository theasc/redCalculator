import axios, {AxiosResponse} from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
});

export const calculateStack = (stack: string[]): Promise<AxiosResponse<string[]>> => api.post('/calculate', { stack });

const apis = {
    calculateStack,
};

export default apis;
