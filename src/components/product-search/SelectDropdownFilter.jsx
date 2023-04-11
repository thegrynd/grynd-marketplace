import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectDropdownFilter({ sortProduct, setSortProduct }) {
  const handleChange = (event) => {
    setSortProduct(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          minWidth: 180,
          px: "2rem",
          height: "100%",
          borderRadius: "0 8px 8px 0",
          background: "green",
        }}
      >
        <InputLabel
          id="demo-simple-select-autowidth-label"
          sx={{ color: "#fff", fontWeight: "700" }}
        >
          Sort Products
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={sortProduct}
          onChange={handleChange}
          autoWidth
          label="Sort Products"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="priceLowToHigh">Low To High</MenuItem>
          <MenuItem value="priceHighToLow">High To Low</MenuItem>
          <MenuItem value="createdAt">Latest Uploaded</MenuItem>
          <MenuItem value="rating">Top Rated</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
