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

const CategoryForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resData1, setResData1] = useState();
  const [resPublicId1, setResPublicId1] = useState();
  const [inputFile1, setInputFile1] = useState();

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
      .post(`${url}/api/v2/categories`, values, {
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
        {/* <Grid item md={12} xs={12}>
          {" "}
          <H3 textAlign="center" color="#066344">
            Create A New Category
          </H3>
        </Grid> */}
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            type="text"
            color="info"
            size="medium"
            id="name"
            name="name"
            label="Name of Category"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <H5 color="red">{formik.errors.name}</H5>
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
              "Save Category"
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;

// import { useState } from "react";
// import {
//   Button,
//   Card,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   MenuItem,
//   TextField,
// } from "@mui/material";
// import { Formik } from "formik";
// import DropZone from "components/DropZone";
// import { FlexBox } from "components/flex-box";
// import BazaarImage from "components/BazaarImage";
// import { UploadImageBox, StyledClear } from "../StyledComponents";

// // ================================================================

// // ================================================================

// const CategoryForm = (props) => {
//   const { initialValues, validationSchema, handleFormSubmit } = props;
//   const [files, setFiles] = useState([]);

//   // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
//   const handleChangeDropZone = (files) => {
//     files.forEach((file) =>
//       Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       })
//     );
//     setFiles(files);
//   };

//   // HANDLE DELETE UPLOAD IMAGE
//   const handleFileDelete = (file) => () => {
//     setFiles((files) => files.filter((item) => item.name !== file.name));
//   };
//   return (
//     <Card
//       sx={{
//         p: 6,
//       }}
//     >
//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item sm={6} xs={12}>
//                 <TextField
//                   fullWidth
//                   name="name"
//                   label="Name"
//                   color="info"
//                   size="medium"
//                   placeholder="Name"
//                   value={values.name}
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   error={!!touched.name && !!errors.name}
//                   helperText={touched.name && errors.name}
//                 />
//               </Grid>

//               <Grid item sm={6} xs={12}>
//                 <TextField
//                   select
//                   fullWidth
//                   color="info"
//                   size="medium"
//                   name="parent"
//                   onBlur={handleBlur}
//                   value={values.parent}
//                   onChange={handleChange}
//                   placeholder="Parent Category"
//                   label="Select Parent Category"
//                   SelectProps={{
//                     multiple: true,
//                   }}
//                 >
//                   <MenuItem value="electronics">Electronics</MenuItem>
//                   <MenuItem value="fashion">Fashion</MenuItem>
//                 </TextField>
//               </Grid>

//               <Grid item xs={12}>
//                 <DropZone
//                   title="Drop & drag category image"
//                   onChange={(files) => handleChangeDropZone(files)}
//                 />

//                 <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
//                   {files.map((file, index) => {
//                     return (
//                       <UploadImageBox key={index}>
//                         <BazaarImage src={file.preview} width="100%" />
//                         <StyledClear onClick={handleFileDelete(file)} />
//                       </UploadImageBox>
//                     );
//                   })}
//                 </FlexBox>
//               </Grid>

//               <Grid item sm={6} xs={12}>
//                 <FormControlLabel
//                   label="Featured Category"
//                   control={
//                     <Checkbox
//                       color="info"
//                       name="featured"
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       value={values.featured}
//                     />
//                   }
//                 />
//               </Grid>

//               {/* <Grid item sm={6} xs={12}>
//                 <TextField
//                   fullWidth
//                   color="info"
//                   size="medium"
//                   type="number"
//                   name="sale_price"
//                   label="Sale Price"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   placeholder="Sale Price"
//                   value={values.sale_price}
//                   error={!!touched.sale_price && !!errors.sale_price}
//                   helperText={(touched.sale_price && errors.sale_price) as string}
//                 />
//                </Grid> */}

//               <Grid item xs={12}>
//                 <Button variant="contained" color="info" type="submit">
//                   Save category
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </Formik>
//     </Card>
//   );
// };
// export default CategoryForm;