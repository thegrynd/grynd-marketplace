import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded() {
  return (
    <Stack spacing={2} sx={{ mt: "1rem", width: "100%" }}>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}
