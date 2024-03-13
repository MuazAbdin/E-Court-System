import { useState } from "react";
import{ Toaster } from "react-hot-toast";
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
import { STAKEHOLDER_FIELDS } from "../../utils/constants";

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