import axios from "axios";
import Cookies from "js-cookie";

export const getUser = async () => {
  const response = await axios.get("/api/user-list/1");
  return response.data;
};
export const getUserIds = async () => {
  const response = await axios.get("/api/user-list/id-list");
  return response.data;
};

export const getLoggedUser = async () => {
  const url = "https://grynd-staging.vercel.app";
  const token = Cookies.get("authToken");
  const response = await axios.get(`${url}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  getUser,
  getUserIds,
  getLoggedUser,
};
