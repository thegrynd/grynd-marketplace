import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { H4 } from "./Typography";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#066344",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, text) {
  return { name, text };
}

export default function SellerInfo({ singleProductData }) {
  const rows = [
    createData("Seller:", `${singleProductData?.seller.storeName}`),
    createData("Seller Rating:", `${singleProductData?.seller.rating}`),
    createData("Product Unit:", `${singleProductData?.unit}`),
    createData("Category:", `${singleProductData?.subcategory.category.name}`),
    createData("Subcategory:", `${singleProductData?.subcategory.name}`),
    createData(
      "Published:",
      `${singleProductData?.isPublished ? "Yes" : "No"}`
    ),
    createData("Featured:", `${singleProductData?.isFeatured ? "Yes" : "No"}`),
    createData("Number of Reviews:", `${singleProductData?.numReviews}`),
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <H4 fontSize="14px"> {row.name}</H4>
              </StyledTableCell>

              <StyledTableCell align="center">{row.text}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
