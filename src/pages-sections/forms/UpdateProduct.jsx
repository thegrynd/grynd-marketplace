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

const UpdateProduct = ({ singleProductData, query, subcategoryData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resData1, setResData1] = useState();
  const [resPublicId1, setResPublicId1] = useState();
  const [inputFile1, setInputFile1] = useState();

  const [isError, setError] = useState("");

  useEffect(() => {
    uploadIconToCloudinary();
  }, [inputFile1]);

  useEffect(() => {
    formik.setFieldValue("images[0].url", resData1);
    formik.setFieldValue("images[0].public_id", resPublicId1);
  }, [resData1, resPublicId1]);

  const submitData = async (values) => {
    const url = process.env.NEXT_PUBLIC_GRYND_URL;
    const token = Cookies.get("authToken");

    console.log("values", values);

    return axios
      .put(`${url}/api/v2/products/${query.id}`, values, {
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

  const uploadIconToCloudinary = async () => {
    const iconUrl = inputFile1;
    const formData = new FormData();
    try {
      formData.append("file", iconUrl);
      formData.append("upload_preset", "kqyvyqbp");
      const res = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD,
        formData
      );
      console.log("res1", res);
      setResData1(() => res.data.secure_url);
      setResPublicId1(() => res.data.public_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCropImageInput = (e) => {
    setInputFile1(e.target.files[0]);
    uploadIconToCloudinary();
  };

  const formik = useFormik({
    initialValues: {
      name: singleProductData?.name ?? "",
      subcategory: singleProductData?.subcategory.id ?? "",
      tags: singleProductData?.tags.map((tag) => tag) ?? [""],
      images: [
        {
          public_id: "",
          url: "",
        },
      ],
      countInStock: singleProductData?.countInStock ?? 0,
      price: singleProductData?.price ?? 0,
      unit: singleProductData?.unit ?? "",
      description: singleProductData?.description ?? "",
      specification: singleProductData?.specification.map((spec) => {
        return {
          title: spec.title,
          body: spec.body,
        };
      }) ?? [
        {
          title: "",
          body: "",
        },
      ],
      discount: singleProductData?.discount ?? 0,
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        submitData(values);
      }, 10000);
      console.log("form-values", values);
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
            <TextField
              fullWidth
              type="text"
              color="info"
              size="medium"
              id="subcategory"
              name="subcategory"
              label="Subcategory"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.subcategory}
              disabled
            />
            {formik.touched.name && formik.errors.name ? (
              <H5 color="red">{formik.errors.name}</H5>
            ) : null}
          </Grid>
          <Grid item md={12} xs={12}>
            <TagsField formik={formik} />
          </Grid>
          <Grid item md={12} xs={12}>
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
          </Grid>
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
              <div>
                {formik.values.specification.map((spec, index) => (
                  // <div key={index}>
                  <Grid
                    container
                    spacing={1}
                    md={12}
                    xs={12}
                    p={8}
                    sx={{ backgroundColor: "white" }}
                    key={spec.title}
                  >
                    <Grid item md={12} xs={12}>
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
                    <Grid item md={12} xs={12}>
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
                        onClick={() =>
                          arrayHelpers.push({ title: "", body: "" })
                        }
                      >
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: "1.25rem",
                          }}
                        >
                          <AiFillPlusCircle />
                        </IconContext.Provider>
                      </Button>
                    </FlexBox>
                  </Grid>
                ))}
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
                "Update Product"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormikProvider>
  );
};

export default UpdateProduct;
