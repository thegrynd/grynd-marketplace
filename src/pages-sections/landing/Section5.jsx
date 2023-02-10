import { Done } from "@mui/icons-material";
import { Box, Container, Grid, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import LazyImage from "components/LazyImage";
import { H2, Paragraph, Span } from "components/Typography";
const ImageBox = styled(Box)(({ theme }) => ({
  padding: 32,
  display: "flex",
  borderRadius: 16,
  justifyContent: "center",
  backgroundColor: theme.palette.grey[300],
}));
const model = [
  "Product model",
  "User model",
  "Shop model",
  "Order model",
  "Address model",
  "20+ more models",
];
const Section5 = () => {
  return (
    <Box mb={4}>
      <Container></Container>
    </Box>
  );
};
export default Section5;
