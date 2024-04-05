import axios from "axios";

let bearerToken = "";
const axiosWithConfig = axios.create();

export const setAxiosConfig = (token: string) => {
  bearerToken = token;
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  // axiosConfig.baseURL = "https://parkify.online";
  axiosConfig.baseURL =
    "https://virtserver.swaggerhub.com/RAICHUGO25/Parkify-Apps/1.0.0";
  if (bearerToken) {
    axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;
  }

  return axiosConfig;
});

export default axiosWithConfig;
