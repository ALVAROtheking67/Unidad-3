import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // Si la API requiere un API Key en los headers, se configuraría así:
  // headers: {
  //   'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
  // }
});

export default apiClient;
