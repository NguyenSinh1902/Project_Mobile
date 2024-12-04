import axios from "axios";

const API_BASE_URL = "http://192.168.1.82:3000/customers";

export const registerCustomer = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/register`, data);
  return response.data;
};

export const loginCustomer = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/login`, data);
  return response.data;
};

export const findCustomerByPhone = async (phone_number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/find-by-phone/${phone_number}`);
    return response.data; // Trả về thông tin khách hàng
  } catch (error) {
    console.error("Error finding customer by phone:", error);
    throw error; // Ném lỗi nếu có lỗi xảy ra
  }
};