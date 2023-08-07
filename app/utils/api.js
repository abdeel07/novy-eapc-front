import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";

export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(BASE_URL + url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
