import axios from "axios";

const API_BASE_URL = "http://192.168.1.11:3000/customers";

export const registerCustomer = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/register`, data);
  return response.data;
};

export const loginCustomer = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/login`, data);
  return response.data;
};
