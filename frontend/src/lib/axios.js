import axios from 'axios';

// This instance is used for authentication purposes. It sends cookies with requests.
export const AxiosInstance = axios.create({
  baseURL: "http://localhost:7878/api",
  withCredentials: true, // Enable cookies for authentication
});


// https://emkc.org/api/v2/piston


