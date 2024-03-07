import React, { useState } from "react";
import Wrapper from "../assets/stylingWrappers/DocumentForm";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SubjectIcon from "@mui/icons-material/Subject";
import GavelIcon from "@mui/icons-material/Gavel";
import GroupsIcon from "@mui/icons-material/Groups";
import BadgeIcon from "@mui/icons-material/Badge";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import toast, { Toaster } from "react-hot-toast";

export default function DocumentForm() {
  const [caseNum, setCaseNum] = useState("");
  const [honoringParty, setHonoringParty] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [subject, setSubject] = useState("");
  const [requirement, setRequirement] = useState("");
  const [onWhichDocument, setOnWhichDocument] = useState("");
  const [documentTitle, setDocumnetTitle] = useState("");

  const cases = ["Case 1", "Case 2", "Case 3"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = [
      { name: "Document Title", value: documentTitle },
      { name: "Honoring Party", value: honoringParty },
      { name: "Subject", value: subject },
      { name: "Requirement", value: requirement },
      { name: "Under which law", value: onWhichDocument },
    ];
    for (const field of fields) {
      if (!field.value) {
        toast.error(`${field.name} cannot be empty!`);
        return;
      }
    }
  };
  return (
    <Wrapper>
      <form>
        <h2>Case Document</h2>
        <div>
          <TextField
            label="Document Title"
            variant="outlined"
            title="document title"
            value={documentTitle}
            onChange={(e) => setDocumnetTitle(e.target.value)}
          />
          <TextField
            label="Honoring Party"
            variant="outlined"
            value={honoringParty}
            onChange={(e) => setHonoringParty(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <GroupsIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* <TextField
            label="Customer Name"
            variant="outlined"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <BadgeIcon />
                </InputAdornment>
              ),
            }}
          /> */}
          {/* <div className="address-container">
            <TextField
              className="address"
              label="Contact Information"
              variant="outlined"
              value={contactInformation}
              onChange={(e) => setContactInformation(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <ContactMailIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="address"
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div> */}

          <TextField
            label="Subject"
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="start">
                    <SubjectIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="requirement-container">
            <TextField
              label="Requirement According to the Subject"
              variant="outlined"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              multiline
              rows={4}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ChecklistRtlIcon/>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {/* <div className="details-container"> */}
          <TextField
            label="Under which law"
            variant="outlined"
            value={onWhichDocument}
            onChange={(e) => setOnWhichDocument(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="start">
                    <GavelIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* <TextField
              label="Parties"
              variant="outlined"
              value={onWhichDocument}
              onChange={(e) => setOnWhichDocument(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="start">
                      <GroupIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /> */}
        </div>
        {/* </div> */}

        <div className="document-container">
          <InputLabel id="case-dropdown-label">Select Case</InputLabel>
          <Select
            labelId="case-dropdown-label"
            id="case-dropdown"
            value={caseNum}
            label="Select Case"
            onChange={(event) => setCaseNum(event.target.value)}
            variant="standard"
          >
            {cases.map((caseName) => (
              <MenuItem key={caseName} value={caseName}>
                {caseName}
              </MenuItem>
            ))}
          </Select>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
          <TextField
            variant="outlined"
            title="attach document"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AttachFileIcon />
                  {/* <FilePresentIcon /> */}
                </InputAdornment>
              ),
              type: "file",
            }}
          />
        </div>
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
        <Toaster position="bottom-center" />
      </form>
    </Wrapper>
  );
}
