import React, { useState } from "react";
import Wrapper from "../assets/stylingWrappers/CaseForm";
import {
  Button,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import toast, { Toaster } from "react-hot-toast";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Person3Icon from "@mui/icons-material/Person3";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { StyledRegisterForm } from "../assets/stylingWrappers/StyledAuthForm";
import { CASE_FIELDS } from "../utils/constants";
import { redirect } from "react-router-dom";
import { fetcher } from "../utils/fetcher";

export default function CaseForm() {
  // const [caseTitle, setCaseTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [parties, setParties] = useState("");
  // const [court, setCourt] = useState("");
  // const [judge, setJudge] = useState("");
  // const [value, setValue] = useState("");
  // const [newParty, setNewParty] = useState("");
  // const [parties, setParties] = useState([]);

  // const handleRadioChange = (event) => {
  //   setValue(event.target.value);
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const fields = [
  //     { name: "Case Title", value: caseTitle },
  //     { name: "Description", value: description },
  //     { name: "Parties", value: parties },
  //     { name: "Status", value: status },
  //     { name: "Court", value: court },
  //     { name: "Judge", value: judge },
  //   ];
  //   for (const field of fields) {
  //     if (!field.value) {
  //       toast.error(`${field.name} cannot be empty!`);
  //       return;
  //     }
  //   }
  // };
  // const addParty = (e) => {
  //   e.preventDefault();
  //   if (newParty.trim() !== "") {
  //     setParties((parties) => [...parties, newParty]);
  //     setNewParty("");
  //   }
  // };

  return (
    
    <StyledRegisterForm
      className={"case-form"}
      formID="case-form"
      title="Legal Case Information Form"
      method="POST"
      buttonText="SUBMIT"
      fields={CASE_FIELDS}
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
    const response = await fetcher('/cases/', {
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
