import React, { useContext, useEffect, useState } from "react";
import { useFormik, FormikProvider, FieldArray } from "formik";
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
import { FlexBox } from "components/flex-box";
import { IconContext } from "react-icons";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

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
  const [resData1, setResData1] = useState();
  const [resPublicId1, setResPublicId1] = useState();
  const [inputFile1, setInputFile1] = useState();
  const [subId, setSubId] = useState();

  const [errorMsg, setErrorMsg] = useState();

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
      name: "",
      subcategory: "",
      tags: [""],
      images: [
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
      console.log("form-values", values);
    },
  });

  // console.log("formik value", formik.values);
  console.log("subId", subId);
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
            <TextField
              fullWidth
              id="tags"
              name="tags"
              label="Tags"
              color="info"
              size="medium"
              placeholder="Tags"
              onBlur={formik.handleBlur}
              value={formik.values.tags}
              onChange={formik.handleChange}
              // error={!!touched.tags && !!errors.tags}
              // helperText={touched.tags && errors.tags}
            />
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
                      <MenuItem
                        value={unit}
                        key={ind}
                        // onClick={() => setSubId(sub.id)}
                      >
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
          {/* <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              id="specification[0].title"
              name="specification[0].title"
              label="Title of Specification"
              color="info"
              size="medium"
              placeholder="Title of Specification"
              onBlur={formik.handleBlur}
              value={formik.values.specification[0].title}
              onChange={formik.handleChange}
              // error={!!touched.tags && !!errors.tags}
              // helperText={touched.tags && errors.tags}
            />
          </Grid> */}
          {/* <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              id="specification[0].body"
              name="specification[0].body"
              label="Body of Specification"
              color="info"
              size="medium"
              placeholder="Body of Specification"
              onBlur={formik.handleBlur}
              value={formik.values.specification[0].body}
              onChange={formik.handleChange}
              // error={!!touched.tags && !!errors.tags}
              // helperText={touched.tags && errors.tags}
            />
          </Grid> */}
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
                    key={index}
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

// import { useState } from "react";
// import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
// import { Formik } from "formik";
// import DropZone from "components/DropZone";
// import { FlexBox } from "components/flex-box";
// import BazaarImage from "components/BazaarImage";
// import { UploadImageBox, StyledClear } from "../StyledComponents";

// // ================================================================

// // ================================================================

// const ProductForm = props => {
//   const {
//     initialValues,
//     validationSchema,
//     handleFormSubmit
//   } = props;
//   const [files, setFiles] = useState([]);

//   // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
//   const handleChangeDropZone = files => {
//     files.forEach(file => Object.assign(file, {
//       preview: URL.createObjectURL(file)
//     }));
//     setFiles(files);
//   };

//   // HANDLE DELETE UPLOAD IMAGE
//   const handleFileDelete = file => () => {
//     setFiles(files => files.filter(item => item.name !== file.name));
//   };
//   return <Card sx={{
//     p: 6
//   }}>
//       <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={validationSchema}>
//         {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit
//       }) => <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item sm={6} xs={12}>
//                 <TextField fullWidth name="name" label="Name" color="info" size="medium" placeholder="Name" value={values.name} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
//               </Grid>
//               <Grid item sm={6} xs={12}>
//                 <TextField select fullWidth color="info" size="medium" name="category" onBlur={handleBlur} placeholder="Category" onChange={handleChange} value={values.category} label="Select Category" SelectProps={{
//               multiple: true
//             }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
//                   <MenuItem value="electronics">Electronics</MenuItem>
//                   <MenuItem value="fashion">Fashion</MenuItem>
//                 </TextField>
//               </Grid>

//               <Grid item xs={12}>
//                 <DropZone onChange={files => handleChangeDropZone(files)} />

//                 <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
//                   {files.map((file, index) => {
//                 return <UploadImageBox key={index}>
//                         <BazaarImage src={file.preview} width="100%" />
//                         <StyledClear onClick={handleFileDelete(file)} />
//                       </UploadImageBox>;
//               })}
//                 </FlexBox>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField rows={6} multiline fullWidth color="info" size="medium" name="description" label="Description" onBlur={handleBlur} onChange={handleChange} placeholder="Description" value={values.description} error={!!touched.description && !!errors.description} helperText={touched.description && errors.description} />
//               </Grid>
//               <Grid item sm={6} xs={12}>
//                 <TextField fullWidth name="stock" color="info" size="medium" label="Stock" placeholder="Stock" onBlur={handleBlur} value={values.stock} onChange={handleChange} error={!!touched.stock && !!errors.stock} helperText={touched.stock && errors.stock} />
//               </Grid>
// <Grid item sm={6} xs={12}>
//   <TextField fullWidth name="tags" label="Tags" color="info" size="medium" placeholder="Tags" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
// </Grid>
//               <Grid item sm={6} xs={12}>
//                 <TextField fullWidth name="price" color="info" size="medium" type="number" onBlur={handleBlur} value={values.price} label="Regular Price" onChange={handleChange} placeholder="Regular Price" error={!!touched.price && !!errors.price} helperText={touched.price && errors.price} />
//               </Grid>
//               <Grid item sm={6} xs={12}>
//                 <TextField fullWidth color="info" size="medium" type="number" name="sale_price" label="Sale Price" onBlur={handleBlur} onChange={handleChange} placeholder="Sale Price" value={values.sale_price} error={!!touched.sale_price && !!errors.sale_price} helperText={touched.sale_price && errors.sale_price} />
//               </Grid>

//               <Grid item sm={6} xs={12}>
//                 <Button variant="contained" color="info" type="submit">
//                   Save product
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>}
//       </Formik>
//     </Card>;
// };
// export default ProductForm;
