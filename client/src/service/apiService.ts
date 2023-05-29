/**
 * Axios Api Service
 */

// Dependencies
import axios from 'axios';

const API_URL =
	process.env.NODE_ENV === 'production'
		? 'https://social-sphere-api-bxi9.onrender.com'
		: 'http://localhost:5000';

const apiService = axios.create({
	baseURL: API_URL,
});

export default apiService;
