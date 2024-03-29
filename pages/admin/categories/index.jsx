import Router from "next/router";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import { CategoryRow } from "pages-sections/admin";
import axios from "axios";
import { parseCookies } from "../../../helpers/validation";

import api from "utils/__api__/dashboard";

// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "id",
    label: "ID",
    align: "left",
  },
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "image",
    label: "Image",
    align: "left",
  },
  {
    id: "level",
    label: "Level",
    align: "left",
  },
  {
    id: "featured",
    label: "Featured",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

// =============================================================================
CategoryList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function CategoryList({ categoryData }) {
  const { docs } = categoryData.data || {};
  console.log("docs", docs);

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredCategories = docs?.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: item.icon.url,
    // featured: item.featured,
    level: Math.ceil(Math.random() * 1),
  }));
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredCategories,
  });
  return (
    <Box py={4}>
      <H3 mb={2} color="#066344">
        Product Categories
      </H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Category"
        searchPlaceholder="Search Category..."
        handleBtnClick={() => Router.push("/admin/categories/create")}
      />

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={docs.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((category) => (
                  <CategoryRow
                    item={category}
                    key={category.id}
                    selected={selected}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(docs.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
// export const getStaticProps = async () => {
//   const categories = await api.category();
//   return {
//     props: {
//       categories,
//     },
//   };
// };

export async function getServerSideProps(context) {
  const { authToken } = parseCookies(context.req);
  const url = process.env.NEXT_PUBLIC_GRYND_URL;

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const authResponse = await axios.get(`${url}/api/v1/auth/me`, config);
  const response = await axios.get(`${url}/api/v2/categories`, config);

  const authUser = authResponse.data;
  const categoryData = response.data;

  // if (!authToken) {
  //   return {
  //     redirect: {
  //       destination: "/vendor/login-user",
  //       permanent: false,
  //     },
  //   };
  // }
  //  else if (authUser.data.role !== "admin") {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // } else if (authUser.success === false) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: { categoryData, authUser },
  };
}
