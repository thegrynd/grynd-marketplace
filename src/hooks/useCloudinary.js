import React, { useState } from "react";
import axios from "axios";

const useCloudinary = () => {
  //   upload product and etc
  const [resIcon1, setResIcon1] = useState();
  const [resPublicIdIcon1, setResPublicIdIcon1] = useState();
  const [resIcon2, setResIcon2] = useState();
  const [resPublicIdIcon2, setResPublicIdIcon2] = useState();
  const [resIcon3, setResIcon3] = useState();
  const [resPublicIdIcon3, setResPublicIdIcon3] = useState();

  const [inputIcon1, setInputIcon1] = useState();
  const [inputIcon2, setInputIcon2] = useState();
  const [inputIcon3, setInputIcon3] = useState();

  //  create seller form and etc
  const [resData1, setResData1] = useState();
  const [resPublicId1, setResPublicId1] = useState();
  const [resData2, setResData2] = useState();
  const [resPublicId2, setResPublicId2] = useState();

  const [inputFile1, setInputFile1] = useState();
  const [inputFile2, setInputFile2] = useState();

  //   upload product and etc
  const uploadIconToCloudinary = async () => {
    const iconUrl = inputIcon1;
    const formData = new FormData();
    try {
      formData.append("file", iconUrl);
      formData.append("upload_preset", "kqyvyqbp");
      const res = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD,
        formData
      );
      console.log("res1", res);
      setResIcon1(() => res.data.secure_url);
      setResPublicIdIcon1(() => res.data.public_id);
    } catch (error) {
      //   console.log(error);
    }
  };
  const uploadIconToCloudinary2 = async () => {
    const iconUrl = inputIcon2;
    const formData = new FormData();
    try {
      formData.append("file", iconUrl);
      formData.append("upload_preset", "kqyvyqbp");
      const res = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD,
        formData
      );
      console.log("res2", res);
      setResIcon2(() => res.data.secure_url);
      setResPublicIdIcon2(() => res.data.public_id);
    } catch (error) {
      //   console.log(error);
    }
  };
  const uploadIconToCloudinary3 = async () => {
    const iconUrl = inputIcon3;
    const formData = new FormData();
    try {
      formData.append("file", iconUrl);
      formData.append("upload_preset", "kqyvyqbp");
      const res = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD,
        formData
      );
      console.log("res3", res);
      setResIcon3(() => res.data.secure_url);
      setResPublicIdIcon3(() => res.data.public_id);
    } catch (error) {
      //   console.log(error);
    }
  };

  const handleCropImageInput1 = (e) => {
    setInputIcon1(e.target.files[0]);
    uploadIconToCloudinary();
  };

  const handleCropImageInput2 = (e) => {
    setInputIcon2(e.target.files[0]);
    uploadIconToCloudinary2();
  };

  const handleCropImageInput3 = (e) => {
    setInputIcon3(e.target.files[0]);
    uploadIconToCloudinary3();
  };

  //   create seller form and etc
  const uploadCoverImageToCloudinary = async () => {
    const coverUrl = inputFile1;
    const formData = new FormData();
    try {
      formData.append("file", coverUrl);
      formData.append("upload_preset", "a7plbqa0");
      const res = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD,
        formData
      );
      // console.log("res1", res);
      setResData1(() => res.data.secure_url);
      setResPublicId1(() => res.data.public_id);
    } catch (error) {
      //   console.log(error);
    }
  };

  const uploadLogoToCloudinary = async () => {
    const logourl = inputFile2;
    const formData = new FormData();
    try {
      formData.append("file", logourl);
      formData.append("upload_preset", "a7plbqa0");
      const res = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD,
        formData
      );
      // console.log("res2", res);
      setResData2(() => res.data.secure_url);
      setResPublicId2(() => res.data.public_id);
    } catch (error) {
      //   console.log(error);
    }
  };

  const handleCoverInput = (e) => {
    setInputFile1(e.target.files[0]);
    uploadCoverImageToCloudinary();
  };

  const handleLogoInput = (e) => {
    setInputFile2(e.target.files[0]);
    uploadLogoToCloudinary();
  };

  return {
    resIcon1,
    resIcon2,
    resIcon3,
    resPublicIdIcon1,
    resPublicIdIcon2,
    resPublicIdIcon3,
    resData1,
    resData2,
    resPublicId1,
    resPublicId2,
    inputIcon1,
    inputIcon2,
    inputIcon3,
    inputFile1,
    inputFile2,
    uploadIconToCloudinary,
    uploadIconToCloudinary2,
    uploadIconToCloudinary3,
    uploadCoverImageToCloudinary,
    uploadLogoToCloudinary,
    handleCropImageInput1,
    handleCropImageInput2,
    handleCropImageInput3,
    handleCoverInput,
    handleLogoInput,
  };
};

export default useCloudinary;
