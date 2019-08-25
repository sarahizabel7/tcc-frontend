import axios from 'axios'

const URL = process.env.URL || 'http://3.81.141.173/'

export let axiosInstance = axios.create({
	baseURL: URL,
	timeout: 10000,
	headers: { 'Access-Control-Allow-Origin': '*' }
})
