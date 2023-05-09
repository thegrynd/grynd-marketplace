import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function TagsField({ formik }) {
  return (
    <Autocomplete
      multiple
      limitTags={2}
      options={productTags}
      getOptionLabel={(option) => option}
      defaultValue={[productTags[0], productTags[1]]}
      onBlur={formik.handleBlur}
      value={formik.values.tags}
      onChange={(_, value) => formik.setFieldValue("tags", value)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          id="tags"
          name="tags"
          label="Tags"
          placeholder="Select Tags"
          color="info"
          size="medium"
        />
      )}
    />
  );
}

const productTags = ["fish", "fresh fish", "dry fish"];
