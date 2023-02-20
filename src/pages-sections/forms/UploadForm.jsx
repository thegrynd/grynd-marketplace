import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { H3 } from "components/Typography";

// form field validation
const validationSchema = yup.object().shape({
  cropName: yup.string().required("crop name is required"),
  cropSize: yup.string().required("crop size is required"),
  cropCategory: yup.string().required("select a category for the crop"),
  cropDescription: yup.string().required("crop description is required"),
});
const UploadForm = () => {
  const initialValues = {
    cropName: "",
    cropSize: "",
    cropCategory: "",
    cropDescription: "",
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            spacing={3}
            md={12}
            p={8}
            sx={{ backgroundColor: "white" }}
          >
            <Grid item md={12} xs={12}>
              {" "}
              <H3 textAlign="center" color="#066344">
                Add a New Crop Product{" "}
              </H3>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color="info"
                size="medium"
                id="cropName"
                name="cropName"
                label="Crop Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cropName}
                error={!!touched.cropName && !!errors.cropName}
                helperText={touched.cropName && errors.cropName}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                color="info"
                size="medium"
                onBlur={handleBlur}
                onChange={handleChange}
                name="cropSize"
                id="cropSize"
                label="Crop Size"
                value={values.cropSize}
                error={!!touched.cropSize && !!errors.cropSize}
                helperText={touched.cropSize && errors.cropSize}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Crop Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="cropCategory"
                  name="cropCategory"
                  value={values.cropCategory}
                  label="Crop Category"
                  onChange={handleChange}
                >
                  <MenuItem value="Tuber">Tuber</MenuItem>
                  <MenuItem value="Veggie">Veggie</MenuItem>
                  <MenuItem value="Fruit">Fruit</MenuItem>
                  <MenuItem value="Cash Crop">Cash Crop</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                rows={6}
                fullWidth
                multiline
                color="info"
                size="medium"
                onBlur={handleBlur}
                name="cropDescription"
                id="cropDescription"
                onChange={handleChange}
                label="Crop Description"
                value={values.cropDescription}
                error={!!touched.site_banner_text && !!errors.site_banner_text}
                helperText={touched.site_banner_text && errors.site_banner_text}
              />
            </Grid>

            <Grid item xs={12}>
              <DropZone
                onChange={(files) => console.log(files)}
                title="Upload Crop Image"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="info"
                variant="contained"
                sx={{
                  mt: 4,
                  backgroundColor: "#066344",
                }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
export default UploadForm;
