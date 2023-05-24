import React, { useEffect, useState } from "react";
import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Grid, TextField } from "@mui/material";
import { H5, Paragraph } from "components/Typography";
import { useRouter } from "next/router";
import { ThreeCircles } from "react-loader-spinner";
import PreviewImage from "pages-sections/forms/PreviewImage";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FlexBox } from "components/flex-box";
import { IconContext } from "react-icons";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import TagsField from "components/forms/TagsField";
import useCloudinary from "hooks/useCloudinary";

const unitData = [
  "count",
  "kg",
  "pounds",
  "tons",
  "liter",
  "gallon",
  "quart",
  "bag",
  "pallet",
];

const ProductForm = ({ subcategoryData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    resIcon1,
    resIcon2,
    resIcon3,
    resPublicIdIcon1,
    resPublicIdIcon2,
    resPublicIdIcon3,
    inputIcon1,
    inputIcon2,
    inputIcon3,
    uploadIconToCloudinary,
    uploadIconToCloudinary2,
    uploadIconToCloudinary3,
    handleCropImageInput1,
    handleCropImageInput2,
    handleCropImageInput3,
  } = useCloudinary();

  const [isError, setError] = useState("");

  useEffect(() => {
    uploadIconToCloudinary();
  }, [inputIcon1]);

  useEffect(() => {
    uploadIconToCloudinary2();
  }, [inputIcon2]);

  useEffect(() => {
    uploadIconToCloudinary3();
  }, [inputIcon3]);

  useEffect(() => {
    formik.setFieldValue("images[0].url", resIcon1);
    formik.setFieldValue("images[0].public_id", resPublicIdIcon1);
  }, [resIcon1, resPublicIdIcon1]);

  useEffect(() => {
    formik.setFieldValue("images[1].url", resIcon2);
    formik.setFieldValue("images[1].public_id", resPublicIdIcon2);
  }, [resIcon2, resPublicIdIcon2]);

  useEffect(() => {
    formik.setFieldValue("images[2].url", resIcon3);
    formik.setFieldValue("images[2].public_id", resPublicIdIcon3);
  }, [resIcon3, resPublicIdIcon3]);

  const submitData = async (values) => {
    const url = process.env.NEXT_PUBLIC_GRYND_URL;
    const token = Cookies.get("authToken");

    console.log("values", values);

    return axios
      .post(`${url}/api/v2/products`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.status === true) {
          router.replace("/vendor/products");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("server responded", error.response.data.message);
          setError(error.response.data.message);
        } else if (error.request) {
          setError("network error");
        } else {
          setError(error.toJSON(error));
        }
      })
      .finally(() => setIsLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      subcategory: "",
      tags: [""],
      images: [
        {
          public_id: "",
          url: "",
        },
        {
          public_id: "",
          url: "",
        },
        {
          public_id: "",
          url: "",
        },
      ],
      countInStock: 0,
      price: 0,
      unit: "",
      description: "",
      specification: [
        {
          title: "",
          body: "",
        },
      ],
      discount: 0,
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        submitData(values);
      }, 10000);
    },
  });

  return (
    <FormikProvider value={formik}>
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
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              type="text"
              color="info"
              size="medium"
              id="name"
              name="name"
              label="Name of Product"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <H5 color="red">{formik.errors.name}</H5>
            ) : null}
          </Grid>
          <Grid item md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select A Sub Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="subcategory"
                name="subcategory"
                value={formik.values.subcategory}
                label="Subcategory"
                onChange={formik.handleChange}
              >
                {subcategoryData?.docs.length > 0
                  ? subcategoryData?.docs.map((sub) => (
                      <MenuItem value={sub.id} key={sub.id}>
                        {sub.name}
                      </MenuItem>
                    ))
                  : "No Sub Categories Present"}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <TagsField formik={formik} />
          </Grid>
          {/* <Grid item md={12} xs={12}>
            {formik.values.images[0].url && <PreviewImage file={inputFile1} />}
            <TextField
              fullWidth
              color="info"
              type="file"
              size="medium"
              id="images[0].url"
              name="images[0].url"
              label="Product Image"
              onBlur={formik.handleBlur}
              onChange={(e) => handleCropImageInput(e)}
              value={undefined}
            />
            {formik.touched.images && formik.errors.images ? (
              <H5 color="red">{formik.errors.images[0].url}</H5>
            ) : null}
          </Grid> */}
          <FieldArray
            name="images"
            render={(arrayHelpers) => (
              <div
                style={{
                  margin: "2em auto",
                }}
              >
                {formik.values.images.map((img, index) => (
                  // <div key={index}>
                  <Grid
                    container
                    spacing={1}
                    md={12}
                    xs={12}
                    p={8}
                    sx={{ backgroundColor: "#B28A3D", borderRadius: "10px" }}
                    key={index}
                  >
                    <Grid item md={12} xs={12}>
                      {formik.values.images[index].url && (
                        <PreviewImage
                          file={
                            index === 0
                              ? inputIcon1
                              : index === 1
                              ? inputIcon2
                              : index === 2
                              ? inputIcon3
                              : ""
                          }
                        />
                      )}
                      <TextField
                        fullWidth
                        color="info"
                        type="file"
                        size="medium"
                        id={`images[${index}].url`}
                        name={`images[${index}].url`}
                        label="Product Image"
                        onBlur={formik.handleBlur}
                        onChange={
                          index === 0
                            ? (e) => handleCropImageInput1(e)
                            : index === 1
                            ? (e) => handleCropImageInput2(e)
                            : index === 2
                            ? (e) => handleCropImageInput3(e)
                            : ""
                        }
                        value={undefined}
                      />
                    </Grid>

                    <FlexBox margin="auto">
                      <Button
                        type="button"
                        color="info"
                        variant="contained"
                        sx={{
                          mt: 4,
                          backgroundColor: "#473718",
                          // width: "100px",
                          ":hover": {
                            backgroundColor: "grey",
                          },
                        }}
                        disabled={formik.values.images.length === 1}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <IconContext.Provider
                          value={{
                            color: "red",
                            size: "1.25rem",
                          }}
                        >
                          <AiFillMinusCircle />
                        </IconContext.Provider>
                      </Button>
                    </FlexBox>
                  </Grid>
                ))}
                <Button
                  type="button"
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
                  onClick={() => arrayHelpers.push({ url: "", public_id: "" })}
                  disabled={formik.values.images.length === 3}
                >
                  {/* <IconContext.Provider
                    value={{
                      color: "green",
                      size: "1.25rem",
                    }}
                  >
                    <AiFillPlusCircle />
                  </IconContext.Provider> */}
                  Add additional image
                </Button>
              </div>
            )}
          />
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              type="number"
              id="countInStock"
              name="countInStock"
              label="Count in Stock"
              color="info"
              size="medium"
              placeholder="Count of Product in Stock"
              onBlur={formik.handleBlur}
              value={formik.values.countInStock}
              onChange={formik.handleChange}
              // error={!!touched.tags && !!errors.tags}
              // helperText={touched.tags && errors.tags}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              type="number"
              id="price"
              name="price"
              label="Price of Product"
              color="info"
              size="medium"
              placeholder="Price of Product"
              onBlur={formik.handleBlur}
              value={formik.values.price}
              onChange={formik.handleChange}
              // error={!!touched.tags && !!errors.tags}
              // helperText={touched.tags && errors.tags}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              type="number"
              id="discount"
              name="discount"
              label="Discount"
              color="info"
              size="medium"
              placeholder="Discount of Product "
              onBlur={formik.handleBlur}
              value={formik.values.discount}
              onChange={formik.handleChange}
              // error={!!touched.tags && !!errors.tags}
              // helperText={touched.tags && errors.tags}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Unit of Product
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="unit"
                name="unit"
                value={formik.values.unit}
                label="Unit of Product"
                onChange={formik.handleChange}
              >
                {unitData.length > 0
                  ? unitData.map((unit, ind) => (
                      <MenuItem value={unit} key={ind}>
                        {unit}
                      </MenuItem>
                    ))
                  : "No Sub Categories Present"}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              rows={6}
              multiline
              id="description"
              name="description"
              label="Description of Product"
              color="info"
              size="medium"
              placeholder="Description of Product"
              onBlur={formik.handleBlur}
              value={formik.values.description}
              onChange={formik.handleChange}
              // error={!!touched.tags && !!errors.tags}
              // helperText={touched.tags && errors.tags}
            />
          </Grid>
          <FieldArray
            name="specification"
            render={(arrayHelpers) => (
              <div
                style={{
                  margin: "2em auto",
                }}
              >
                {formik.values.specification.map((spec, index) => (
                  // <div key={index}>
                  <Grid
                    container
                    spacing={1}
                    md={12}
                    xs={12}
                    p={8}
                    sx={{ backgroundColor: "#B28A3D", borderRadius: "10px" }}
                  >
                    <Grid item md={12} xs={12} key={index}>
                      <TextField
                        fullWidth
                        id={`specification[${index}].title`}
                        name={`specification[${index}].title`}
                        value={formik.values.specification[index].title}
                        onChange={formik.handleChange}
                        label="Title of Specification"
                        color="info"
                        size="medium"
                        placeholder="Title of Specification"
                      />
                    </Grid>
                    <Grid item md={12} xs={12} key={index}>
                      <TextField
                        fullWidth
                        id={`specification.${index}.body`}
                        name={`specification.${index}.body`}
                        value={formik.values.specification[index].body}
                        onChange={formik.handleChange}
                        label="Body of Specification"
                        color="info"
                        size="medium"
                        placeholder="Body of Specification"
                      />
                    </Grid>
                    <FlexBox margin="auto">
                      <Button
                        type="button"
                        color="info"
                        variant="contained"
                        sx={{
                          mt: 4,
                          backgroundColor: "#473718",
                          // width: "100px",
                          ":hover": {
                            backgroundColor: "grey",
                          },
                        }}
                        disabled={(index = 0)}
                        onClick={() => arrayHelpers.remove(index)}
                        key={index}
                      >
                        <IconContext.Provider
                          value={{
                            color: "red",
                            size: "1.25rem",
                          }}
                        >
                          <AiFillMinusCircle />
                        </IconContext.Provider>
                      </Button>
                    </FlexBox>
                  </Grid>
                ))}
                <Button
                  type="button"
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
                  onClick={() => arrayHelpers.push({ title: "", body: "" })}
                >
                  {/* <IconContext.Provider
                    value={{
                      color: "green",
                      size: "1.25rem",
                    }}
                  >
                    <AiFillPlusCircle />
                  </IconContext.Provider> */}
                  Add additional specs
                </Button>
              </div>
            )}
          />

          <Paragraph
            color="red"
            textAlign="center"
            margin="auto"
            marginBottom="1rem"
            fontSize="16px"
          >
            {isError}
          </Paragraph>
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
                "Upload Product"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormikProvider>
  );
};

export default ProductForm;
