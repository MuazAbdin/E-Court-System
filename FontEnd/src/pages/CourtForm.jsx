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
export default function CourtForm() {
  // name, city, street, phoneNumber, email
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = [
      { name: "Court Name", value: name },
      { name: "City", value: city },
      { name: "Street", value: street },
      { name: "Phone Number", value: phoneNumber },
      { name: "Email", value: email },
    ];

    for (const field of fields) {
      if (!field.value) {
        toast.error(`${field.name} cannot be empty!`);
        return;
      }

      if (field.name === "Email" && !field.value.match(emailRegex)) {
        toast.error("Invalid email format!");
        return;
      }
    }
  };
  return (
    // <Wrapper>
    //   <form>
    //     <h2>Court Details Form</h2>
    //     <TextField
    //       label="Court Name"
    //       variant="outlined"
    //       title="court name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <div className="contact-container">
    //       <TextField
    //         label="Court Phone"
    //         variant="outlined"
    //         title="court contact number"
    //         value={phoneNumber}
    //         onChange={(e) => setPhoneNumber(e.target.value)}
    //         InputProps={{
    //           endAdornment: (
    //             <InputAdornment position="end">
    //               <PhoneIcon />
    //             </InputAdornment>
    //           ),
    //         }}
    //       />
    //       <TextField
    //         label="Email"
    //         variant="outlined"
    //         title="court contact email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         InputProps={{
    //           endAdornment: (
    //             <InputAdornment position="end">
    //               <MailIcon />
    //             </InputAdornment>
    //           ),
    //         }}
    //       />
    //     </div>
    //     <div className="address-container">
    //       <TextField
    //         label="City"
    //         variant="outlined"
    //         title="the venue of the court"
    //         value={city}
    //         onChange={(e) => setCity(e.target.value)}
    //         InputProps={{
    //           endAdornment: (
    //             <InputAdornment position="end">
    //               <LocationCityIcon />
    //             </InputAdornment>
    //           ),
    //         }}
    //       />
    //       <TextField
    //         label="Street"
    //         variant="outlined"
    //         title="court street address"
    //         value={street}
    //         onChange={(e) => setStreet(e.target.value)}
    //         InputProps={{
    //           endAdornment: (
    //             <InputAdornment position="end">
    //               <LocationOnIcon />
    //             </InputAdornment>
    //           ),
    //         }}
    //       />
    //     </div>

    //     <button className="submit-btn" onClick={handleSubmit}>
    //       ADD COURT
    //     </button>
    //     <Toaster position="bottom-center" />
    //   </form>
    // </Wrapper>
    <StyledRegisterForm className={'court-form'}
    formID="court-form"
    title="Court Details Form"
    method="POST"
    buttonText="ADD COURT"
    fields={COURT_FIELDS}
    />
  );
}

export async function action ({request}){
  const fd = await request.formData()
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );
  console.log(data);
  
  try {
    const response = await fetcher('/court/', {
      method: request.method,
      body: JSON.stringify(data),
    });

    console.log(response);
    if (!response.ok) {
      const data = await response.text();
      console.log(data);
      throw new Error(data);
    }

    toast.success("Created Successfully!");
    return redirect('');
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
