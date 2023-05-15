import { useContext, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ShoppingBag } from "@mui/icons-material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import OrderRow from "pages-sections/orders/OrderRow";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { AuthSellerOrderContext } from "contexts/AuthSellerOrderContext";
import { LoginContext } from "contexts/LoginContext";

// ====================================================

// ====================================================

SellerOrders.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function SellerOrders({ orderList }) {
  const [authSellerOrderData, pageIndex, setPageIndex] = useContext(
    AuthSellerOrderContext
  );

  const [getAuthUser, setGetAuthUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};

  console.log("authUser1", authUser);

  const handleChange = (event, value) => {
    setPageIndex(value);
  };

  return (
    <>
      {/* <CustomerDashboardLayout> */}
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        title={`Orders For ${authUser?.data.firstname ?? "Loading..."} ${
          authUser?.data.surname ?? ""
        }`}
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* ORDER LIST AREA */}
      <TableRow
        elevation={0}
        sx={{
          padding: "0px 18px",
          background: "none",
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Order ID
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Status
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Date purchased
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Total
        </H5>

        <H5
          my={0}
          px={2.75}
          color="grey.600"
          flex="0 0 0 !important"
          display={{
            xs: "none",
            md: "block",
          }}
        />
      </TableRow>

      {authSellerOrderData?.docs.map((order) => (
        <OrderRow order={order} key={order.id} />
      ))}

      <FlexBox justifyContent="center" mt={5} mb={5}>
        <Stack spacing={2}>
          <Pagination
            count={authSellerOrderData?.totalPages ?? 5}
            page={pageIndex}
            onChange={handleChange}
            color="secondary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </FlexBox>
      {/* </CustomerDashboardLayout> */}
    </>
  );
}

// export default SellerOrders;
