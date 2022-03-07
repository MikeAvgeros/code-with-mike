import axios from 'axios';

const api = axios.create({ baseURL: 'https://codewithmike.herokuapp.com/api/' });

export default api;