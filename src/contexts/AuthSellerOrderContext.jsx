import { createContext, useMemo, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useSWR, { preload } from "swr";

export const AuthSellerOrderContext = createContext([]);

const AuthUSellerOrderProvider = ({ children }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const token = Cookies.get("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const address = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/orders/products?page=${pageIndex}`;

  const fetcher = async (url) => await axios.get(url, config);
  const { data, error } = useSWR(address, fetcher);

  // preload in effects
  useEffect(() => {
    preload(address, fetcher);
  }, []);

  const { data: authSellerOrderData } = data?.data || {};

  const authSellerOrderValue = useMemo(
    () => [authSellerOrderData, pageIndex, setPageIndex],
    [authSellerOrderData]
  );

  return (
    <AuthSellerOrderContext.Provider value={authSellerOrderValue}>
      {children}
    </AuthSellerOrderContext.Provider>
  );
};

export default AuthUSellerOrderProvider;
