import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";

const postRequest = async (url, data) => {
  try {
    const response = await axios.post(BASE_URL + url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

const getRequest = async (url) => {
  try {
    const response = await axios.get(BASE_URL + url);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

const putRequest = async (url, data) => {
  try {
    const response = await axios.put(BASE_URL + url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export { postRequest, getRequest, putRequest };
