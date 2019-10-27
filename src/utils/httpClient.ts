import axios from 'axios';

const URL = process.env.URL || 'http://3.81.141.173/'
const axiosInstance = axios.create({
	baseURL: URL,
	timeout: 20000
})

export {axiosInstance}
