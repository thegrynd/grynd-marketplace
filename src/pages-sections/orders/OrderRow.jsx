import Link from "next/link";
import { format } from "date-fns";
import { East } from "@mui/icons-material";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { currency } from "lib";
// =================================================

const OrderRow = ({ order }) => {
  const getColor = (status) => {
    switch (status) {
      case "pending":
        return "#F2F2F2";
      case "processing":
        return "#E4D00A";
      case "delivered":
        return "#50C878";
      case "cancelled":
        return "#EE4B2B";
      default:
        return "";
    }
  };
  return (
    <Link href={`/orders/${order.id}`} passHref>
      {/* <a> */}
      <TableRow
        sx={{
          my: "1rem",
          padding: "6px 18px",
        }}
      >
        <H5 m={0.75} textAlign="left">
          {order.id.split("-")[0]}
        </H5>

        <Box m={0.75}>
          <Chip
            size="small"
            label={order.orderStatus}
            sx={{
              p: "0.25rem 0.5rem",
              fontSize: 12,
              color: !!getColor(order.orderStatus)
                ? `${getColor(order.orderStatus)}.900`
                : "inherit",
              backgroundColor: !!getColor(order.orderStatus)
                ? `${getColor(order.orderStatus)}`
                : "none",
            }}
          />
        </Box>

        <Typography className="pre" m={0.75} textAlign="left">
          {format(new Date(order.createdAt), "MMM dd, yyyy")}
        </Typography>

        <Typography m={0.75} textAlign="left" color="#066344" fontWeight={600}>
          {currency(order.totalPrice)}
        </Typography>

        <Typography
          color="grey.600"
          textAlign="center"
          sx={{
            flex: "0 0 0 !important",
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <IconButton>
            <East
              fontSize="small"
              color="inherit"
              sx={{
                transform: ({ direction }) =>
                  `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
              }}
            />
          </IconButton>
        </Typography>
      </TableRow>
      {/* </a> */}
    </Link>
  );
};
export default OrderRow;
