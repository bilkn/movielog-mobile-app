import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
let headers = {};
/* 
if (localStorage.accessToken) {
  headers.Authorization = `Bearer ${localStorage.accessToken}`;
} */

export const axiosInstance = axios.create({
  baseURL,
  headers,
});


