import React, { useState } from "react";
import Wrapper from "../assets/stylingWrappers/EventForm";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { MdEditDocument } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { StyledRegisterForm } from "../assets/stylingWrappers/StyledAuthForm";
import { EVENT_FIELDS } from "../utils/constants";
import { redirect } from "react-router-dom";
import { fetcher } from "../utils/fetcher";
export default function EventForm() {
  // const [caseId, setCaseId] = useState("");
  // const [eventType, setEventType] = useState("");
  // const [date, setDate] = useState("");
  // const [description, setDescription] = useState("");

  // const handleAddEvent = (e) => {
  //   e.preventDefault();
  //   const fields = [
  //     { name: "Case ID", value: caseId },
  //     { name: "Event Type", value: eventType },
  //     { name: "Date", value: date },
  //     { name: "Description", value: description },
  //   ];
  //   for (const field of fields) {
  //     if (!field.value) {
  //       toast.error(`${field.name} cannot be empty!`);
  //       return;
  //     }
  //   }
  // };

  return (
    // <Wrapper>
    //   <form>
    //     <h2>Legal Events Log Form</h2>
    //     <TextField
    //       label="Event Type"
    //       variant="outlined"
    //       value={eventType}
    //       onChange={(e) => setEventType(e.target.value)}
    //     />
    //     <div className="description">
    //       <TextField
    //         label="Description"
    //         variant="outlined"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         multiline
    //         rows={4}
    //         InputProps={{
    //           endAdornment: (
    //             <InputAdornment position="end">
    //               <MdEditDocument />
    //             </InputAdornment>
    //           ),
    //         }}
    //       />
    //     </div>
    //     <TextField
    //       label="Date"
    //       type="date"
    //       variant="outlined"
    //       value={date}
    //       onChange={(e) => setDate(e.target.value)}
    //       InputLabelProps={{
    //         shrink: true,
    //       }}
    //     />

    //     <button onClick={handleAddEvent}>
    //       ADD EVENT
    //     </button>
    //     <Toaster position="bottom-center" />
    //   </form>
    // </Wrapper>
<>
    <StyledRegisterForm
      className={"event-form"}
      formID="event-form"
      title="Legal Events Log Form"
      method="POST"
      buttonText="ADD EVENT"
      fields={EVENT_FIELDS}
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

  for (const key in data) {
    if (!data[key]) {
      toast.error(`${key} cannot be empty!`);
      return null;
    }
  }

  try {
    const response = await fetcher("/cases/", {
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
