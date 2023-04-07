import { React, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { SearchOutlinedIcon } from "components/search-box/styled";
import SelectDropdownFilter from "./SelectDropdownFilter";

const SearchProduct = ({
  setSearchValue,
  searchValue,
  setSortProduct,
  sortProduct,
}) => {
  const SEARCH_BUTTON = (
    <Button
      color="primary"
      disableElevation
      variant="contained"
      sx={{
        px: "2rem",
        height: "100%",
        borderRadius: "0 8px 8px 0",
        background: "green",
      }}
    >
      Search
    </Button>
  );

  return (
    <>
      <Box className="searchBox">
        <TextField
          placeholder="Searching products"
          fullWidth
          InputProps={{
            sx: {
              height: 50,
              paddingRight: 0,
              color: "grey.700",
              background: "#fff",
              "& fieldset": {
                border: "none",
              },
            },
            endAdornment: (
              <SelectDropdownFilter
                sortProduct={sortProduct}
                setSortProduct={setSortProduct}
              />
            ),
            startAdornment: <SearchOutlinedIcon fontSize="small" />,
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        />
      </Box>
    </>
  );
};

export default SearchProduct;
