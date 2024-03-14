import axios from "axios";

const SERVER_URL = "https://open.api.nexon.com/maplestory/v1";

const serverInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: Infinity,
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-nxopen-api-key": process.env.NEXT_PUBLIC_PROD_API_KEY!,
  },
});

export const getServerInstance = () => {
  serverInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        console.log("axios catch 401");
      }
      return Promise.reject(error);
    }
  );

  return serverInstance;
};
