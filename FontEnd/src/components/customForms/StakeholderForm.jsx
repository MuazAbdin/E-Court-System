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