import axios from 'axios';

const URL = process.env.URL || 'https://safe-caverns-92780.herokuapp.com/'
const axiosInstance = axios.create({
	baseURL: URL,
	timeout: 20000
})

export {axiosInstance}
