import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Grid, TextField } from "@mui/material";
import { H3, H5 } from "components/Typography";
import { useRouter } from "next/router";
import { ThreeCircles } from "react-loader-spinner";
import PreviewImage from "pages-sections/forms/PreviewImage";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const UpdateSubCategory = ({ currentCategory }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resData1, setResData1] = useState();
  const [resPublicId1, setResPublicId1] = useState();
  const [inputFile1, setInputFile1] = useState();

  const { id } = router.query;
  const { subcategories } = currentCategory;

  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    uploadIconToCloudinary();
  }, [inputFile1]);

  useEffect(() => {
    formik.setFieldValue("icon.url", resData1);
    formik.setFieldValue("icon.public_id", resPublicId1);
  }, [resData1, resPublicId1]);

  const submitData = async (values) => {
    const url = "https://grynd-staging.vercel.app";
    const token = Cookies.get("authToken");

    console.log("values", values);
    setIsLoading(true);

    return axios
      .put(`${url}/api/v2/subcategories/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.status === true) {
          router.replace("/admin/categories");
        }
      })
      .catch((err) => {
        console.log(err);
        // setErrorMsg(err.response.data.validationErrors);
      })
      .finally(() => setIsLoading(false));
  };

  const uploadIconToCloudinary = async () => {
    const iconUrl = inputFile1;
    const formData = new FormData();
    try {
      formData.append("file", iconUrl);
      formData.append("upload_preset", "kqyvyqbp");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/grynd/image/upload",
        formData
      );
      console.log("res1", res);
      setResData1(() => res.data.secure_url);
      setResPublicId1(() => res.data.public_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCoverInput = (e) => {
    setInputFile1(e.target.files[0]);
    uploadIconToCloudinary();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      icon: {
        public_id: "",
        url: resData1,
      },
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Category name must have at least 5 characters")
        .max(50, "Category name must be 15 characters or less")
        .required("The category name is required")
        .matches(/^[aA-zZ\s]+$/, "Category Name must contain only alphabets"),
      category: Yup.string(),

      icon: Yup.object().shape({
        public_id: Yup.string(),
        url: Yup.string(),
      }),
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        submitData(values);
      }, 10000);
      console.log("form-values", values);
    },
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        style={{
          marginTop: "1rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={1}
          md={8}
          p={8}
          sx={{ backgroundColor: "white" }}
        >
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Name of Sub Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="name"
                name="name"
                value={formik.values.name}
                label="Name of Sub Category"
                onChange={formik.handleChange}
              >
                {subcategories.map((sub) => (
                  <MenuItem value={sub?.name} key={sub.id}>
                    {sub?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.touched.name && formik.errors.name ? (
              <H5 color="red">{formik.errors.name}</H5>
            ) : null}
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="category"
                name="category"
                value={formik.values.category}
                label="Category"
                onChange={formik.handleChange}
              >
                <MenuItem value={currentCategory?.id} key={currentCategory.id}>
                  {currentCategory?.name}
                </MenuItem>
              </Select>
            </FormControl>
            {formik.touched.category && formik.errors.category ? (
              <H5 color="red">{formik.errors.category}</H5>
            ) : null}
          </Grid>
          <Grid item md={12} xs={12}>
            {formik.values.icon && <PreviewImage file={inputFile1} />}
            <TextField
              fullWidth
              color="info"
              type="file"
              size="medium"
              id="icon.url"
              name="icon.url"
              label="Category Icon"
              onBlur={formik.handleBlur}
              onChange={(e) => handleCoverInput(e)}
              value={undefined}
            />
            {formik.touched.icon && formik.errors.icon ? (
              <H5 color="red">{formik.errors.icon.url}</H5>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              color="info"
              variant="contained"
              sx={{
                mt: 4,
                backgroundColor: "#066344",
                // width: "100px",
                ":hover": {
                  backgroundColor: "grey",
                },
              }}
            >
              {isLoading ? (
                <ThreeCircles
                  height="30"
                  width="30"
                  color="#fff"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor=""
                  innerCircleColor=""
                  middleCircleColor=""
                />
              ) : (
                "Update SubCategory"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default UpdateSubCategory;
