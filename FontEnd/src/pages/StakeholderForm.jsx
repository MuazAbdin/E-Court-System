import React, { useState } from "react";
import Wrapper from "../assets/stylingWrappers/StakeholderForm";
import toast, { Toaster } from "react-hot-toast";
import {
  InputAdornment,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { StyledRegisterForm } from "../assets/stylingWrappers/StyledAuthForm";
import { STAKEHOLDER_FIELDS } from "../utils/constants";
import { fetcher } from "../utils/fetcher";
import { redirect } from "react-router-dom";
import { StyledForms } from "../assets/stylingWrappers/StyledForms";

export default function StakeholderForm() {
  const [stakeholderType, setStakeholderType] = useState("");

  return (
    <>
      <StyledForms
        className={"stakeholder-form"}
        formID="stakeholder-form"
        title="Stakeholder Details Form"
        method="POST"
        buttonText="SUBMIT"
        fields={STAKEHOLDER_FIELDS}
      >
        <div className="court-judge">
          <InputLabel id="stakeholder-dropdown-label">
            Stakeholder Type
          </InputLabel>
          <Select
            name="stakeholder-form-stakeholderType"
            labelId="stakeholder-dropdown-label"
            id="stakeholder-form-stakeholderType"
            variant="standard"
            value={stakeholderType}
            onChange={(e) => setStakeholderType(e.target.value)}
          >
            <MenuItem value={"Witness"}>Witness</MenuItem>
          </Select>
        </div>
      </StyledForms>
      <Toaster position="bottom-center" />
    </>
  );
}
export async function action({ request }) {
  const fd = await request.formData();
  console.log(fd)
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );
  // data.stakeholderType = document.getElementById("stakeholder-form-stakeholderType").value;

  console.log(data);
  try {
    const response = await fetcher("/stakeholders/", {
      method: request.method,
      body: JSON.stringify(data),
    });

    console.log(response);
    // for (const key in data) {
    //   if (key !== "stakeholderType" && !data[key]) {
    //     toast.error(`${key} cannot be empty!`);
    //     return null;
    //   }
    // }

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
