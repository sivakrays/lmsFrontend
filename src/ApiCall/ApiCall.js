import axios from "axios";

//const BASE_URL = "https://lms-production-e6b8.up.railway.app/lms/api";
// const BASE_URL =
//   "http://ec2-34-203-239-128.compute-1.amazonaws.com:8080/lms/api";

const BASE_URL = "http://192.168.1.3:8080/lms/api";

const apiInstance = axios.create({
  baseURL: BASE_URL,
});

apiInstance.interceptors.request.use((config) => {
  console.log("API Request", config);
  return config;
});

apiInstance.interceptors.response.use(
  (response) => {
    // console.log("API Response", response);
    return response;
  },
  (error) => {
    console.error("API Error", error);
    return Promise.reject(error);
  },
);

export const get = (url, config = {}) => {
  return apiInstance.get(url, config);
};

export const post = (url, data, config = {}) => {
  return apiInstance.post(url, data, config);
};

export const put = (url, data, config = {}) => {
  return apiInstance.put(url, data, config);
};

export const del = (url, config = {}) => {
  return apiInstance.delete(url, config);
};
