import { createContext, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useSWR from "swr";

export const AuthUserOrderContext = createContext([]);

const AuthUserOrderProvider = ({ children }) => {
  const token = Cookies.get("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const address = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/orders`;

  const fetcher = async (url) => await axios.get(url, config);
  const { data, error } = useSWR(address, fetcher);

  const { data: authUserOrderData } = data?.data || {};
  //   console.log("authUserOrderData", authUserOrderData);
  //   console.log("main error", error);

  const authUserOrderValue = useMemo(
    () => [authUserOrderData],
    [authUserOrderData]
  );

  return (
    <AuthUserOrderContext.Provider value={authUserOrderValue}>
      {children}
    </AuthUserOrderContext.Provider>
  );
};

export default AuthUserOrderProvider;
