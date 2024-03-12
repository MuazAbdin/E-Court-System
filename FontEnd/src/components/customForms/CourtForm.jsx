import React, { useState } from "react";
import Wrapper from "../assets/stylingWrappers/CourtForm";
import { InputAdornment, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import { StyledRegisterForm } from "../assets/stylingWrappers/StyledAuthForm";
import { COURT_FIELDS } from "../utils/constants";
import { redirect } from "react-router-dom";
import { fetcher } from "../utils/fetcher";
import { StyledForms } from "../assets/stylingWrappers/StyledForms";
export default function CourtForm() {

  
  return (
    <>
      <StyledForms
        className={"court-form"}
        formID="court-form"
        title="Court Details Form"
        method="POST"
        buttonText="ADD COURT"
        fields={COURT_FIELDS}
      />
      <Toaster position="bottom-center" />
    </>
  );
}