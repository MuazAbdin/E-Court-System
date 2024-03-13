import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { redirect } from "react-router-dom";

import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
import { fetcher } from "../../utils/fetcher";
import { DOCUMENT_FIELDS } from "../../utils/constants";



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
   
    <>
      <StyledForms
        className={"document-form"}
        formID="document-form"
        title="Case Document"
        method="POST"
        buttonText="SUBMIT"
        fields={DOCUMENT_FIELDS}
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
