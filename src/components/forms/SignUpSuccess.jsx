import React, { useState } from "react";
import { H1, Paragraph, Small } from "components/Typography";
import { Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import OtpInput from "react18-input-otp";
import axios from "axios";
import { Audio } from "react-loader-spinner";

import Link from "next/link";

const SignUpSuccess = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [getVerifiedData, setGetVerifiedData] = useState({});
  const [getErrorData, setGetErrorData] = useState("");
  const [verified, setVerified] = useState(false);

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  const verifyPhone = async (values) => {
    const url = "https://grynd-staging.vercel.app";

    console.log("values", values);
    const verificationKey = Cookies.get("VerificationToken");
    const token = Cookies.get("SignUpToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    setIsLoading(true);
    return axios
      .post(
        `${url}/api/v1/auth/verify-phone`,
        {
          otp: otp,
          verificationKey: verificationKey,
        },
        config
      )
      .then((response) => {
        console.log("responseOtp", response);
        setGetVerifiedData(response);
        if (response.data.status === true) {
          setVerified(true);
        }
      })
      .catch((err) => {
        setGetErrorData(err.response?.data.message);
        console.log("ye", getVerifiedData);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Box
      sx={{
        mt: "2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {verified === false ? (
        <>
          <H1 color="#066344" textAlign="center">
            Congratulations! 🎉
          </H1>
          <Paragraph>
            You&apos;ve successfully signed up to{" "}
            <span style={{ fontWeight: 700, color: "#066344" }}> Grynd</span>
          </Paragraph>
          <Small fontWeight={700}>
            One more thing! Please verify your phone number
          </Small>
          <Box sx={{ mt: "2rem" }}>
            <div>Enter OTP sent to you below</div>
          </Box>
          <Box>
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              separator={<span></span>}
              shouldAutoFocus
              className="otp-input"
              inputStyle={{ fontSize: "2rem" }}
            />
          </Box>
          <Small color="red"> {getErrorData} </Small>
          <Button
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: "#066344",
              color: "#fff",
              ":hover": {
                backgroundColor: "#066344",
                color: "#000",
              },
            }}
            onClick={verifyPhone}
          >
            {isLoading ? (
              <Audio
                height="80"
                width="80"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle
                wrapperClass
              />
            ) : (
              "Verify Phone Number"
            )}
          </Button>
        </>
      ) : (
        <>
          <Box>
            {/* Success Checkmark */}
            <div className="checkmark-circle">
              <div className="background"></div>
              <div className="checkmark draw"></div>
            </div>
            {/*  */}

            <Paragraph fontWeight={600} textAlign="center" marginTop="1rem">
              {getVerifiedData.data.message}
            </Paragraph>
            <Link href="/login-user">
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  backgroundColor: "#066344",
                  color: "#fff",
                  ":hover": {
                    backgroundColor: "#066344",
                    color: "#000",
                  },
                }}
              >
                Proceed to Login
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SignUpSuccess;
