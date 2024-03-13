import toast, { Toaster } from "react-hot-toast";

import { redirect } from "react-router-dom";

import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
import { fetcher } from "../../utils/fetcher";
import { EVENT_FIELDS } from "../../utils/constants";

export default function EventForm() {
  return (
    <>
      <StyledForms
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
