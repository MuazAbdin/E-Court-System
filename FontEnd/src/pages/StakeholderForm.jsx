import React, { useState } from "react";
import Wrapper from "../assets/stylingWrappers/StakeholderForm";
import toast, { Toaster } from "react-hot-toast";
import { InputAdornment, TextField } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { StyledRegisterForm } from "../assets/stylingWrappers/StyledAuthForm";
import { STAKEHOLDER_FIELDS } from "../utils/constants";
import { fetcher } from "../utils/fetcher";
import { redirect } from "react-router-dom";

export default function StakeholderForm() {
  const [idNumber, setIdNumber] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = [
      { name: "ID Number", value: idNumber },
      { name: "First Name", value: firstName },
      { name: "Last Name", value: lastName },
      { name: "Email", value: email },
      { name: "Phone", value: phone },
      { name: "City", value: city },
      { name: "Street Address", value: streetAddress },
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

      if (field.name === "Phone" && isNaN(field.value)) {
        toast.error(`${field.name} must be a number!`);
        return;
      }
      if (field.name === "City" && !field.value.match(/[a-zA-Z]/)) {
        toast.error("City name must contain ONLY letters!");
        return;
      }
    }
  };

  return (
    // <Wrapper>
    //   <form>
    //     <h2>Stakeholder Details Form</h2>
    //     <TextField
    //       label="ID Number"
    //       variant="outlined"
    //       title="id number"
    //       onChange={(e) => setIdNumber(e.target.value)}
    //     />
    //     <div className="full-name">
    //       <TextField
    //         label="First Name"
    //         variant="outlined"
    //         title="first name"
    //         onChange={(e) => setFirstName(e.target.value)}
    //       />
    //       <TextField
    //         label="Last Name"
    //         variant="outlined"
    //         title="last name"
    //         onChange={(e) => setLastName(e.target.value)}
    //       />
    //     </div>

    //     <div className="contact-container">
    //       <TextField
    //         label="Email"
    //         variant="outlined"
    //         title="email address"
    //         onChange={(e) => setEmail(e.target.value)}
    //         InputProps={{
    //           endAdornment: (
    //             <InputAdornment position="end">
    //               <MailIcon />
    //             </InputAdornment>
    //           ),
    //         }}
    //       />
    //       <TextField
    //         label="Phone"
    //         variant="outlined"
    //         title="phone number"
    //         onChange={(e) => setPhone(e.target.value)}
    //         InputProps={{
    //           endAdornment: (
    //             <InputAdornment position="end">
    //               <PhoneIcon />
    //             </InputAdornment>
    //           ),
    //         }}
    //       />
    //     </div>

    //     <div className="address-container">
    //       <TextField
    //         label="City"
    //         variant="outlined"
    //         title="city"
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
    //         label="Street Address"
    //         variant="outlined"
    //         title="street address"
    //         onChange={(e) => setStreetAddress(e.target.value)}
    //         InputProps={{
    //           endAdornment: (
    //             <InputAdornment position="end">
    //               <LocationOnIcon />
    //             </InputAdornment>
    //           ),
    //         }}
    //       />
    //     </div>
    //     <button onClick={handleSubmit}>SUBMIT</button>

    //     <Toaster position="bottom-center" />
    //   </form>
    // </Wrapper>
    <>
      <StyledRegisterForm
        className={"stakeholder-form"}
        formID="stakeholder-form"
        title="Stakeholder Details Form"
        method="POST"
        buttonText="SUBMIT"
        fields={STAKEHOLDER_FIELDS}
      />
      <Toaster position="bottom-center" />
    </>
  );
}
export async function action({ request }) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );
  console.log(data);

  try {
    const response = await fetcher("/stakeholder/", {
      method: request.method,
      body: JSON.stringify(data),
    });

    console.log(response);
    for (const key in data) {
      if (!data[key]) {
        toast.error(`${key} cannot be empty!`);
        return null;
      }
    }

    if (!response.ok) {
      const data = await response.text();
      console.log(data);
      throw new Error(data);
    }

    toast.success("Created Successfully!");
    return redirect("");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
