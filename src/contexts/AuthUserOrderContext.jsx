import { createContext, useMemo, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useSWR, { preload } from "swr";

export const AuthUserOrderContext = createContext([]);

const AuthUserOrderProvider = ({ children }) => {
  const token = Cookies.get("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const address = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/orders`;

  const fetcher = async (url) => await axios.get(url, config);
  const { data, error } = useSWR(address, fetcher);

  // preload in effects
  useEffect(() => {
    preload(address, fetcher);
  }, []);

  const { data: authUserOrderData } = data?.data || {};

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
