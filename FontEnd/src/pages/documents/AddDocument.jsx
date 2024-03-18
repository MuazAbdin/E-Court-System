import { toast } from "react-toastify";
import StyledDocumentForm from "../../assets/stylingWrappers/StyledDocumentForm";
import { DOCUMENT_FIELDS } from "../../utils/constants";
import { fetcher } from "../../utils/fetcher";
import { redirect } from "react-router-dom";

function AddDocument() {
  return (
    <StyledDocumentForm
      formID="document-form"
      title="new document"
      method="POST"
      buttonText="submit"
      fields={DOCUMENT_FIELDS}
    ></StyledDocumentForm>
  );
}

export default AddDocument;

export async function action({ request }) {
  // console.log(request);
  const fd = await request.formData();
  // console.log(fd);
  // console.log([...fd.entries()]);
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );

  console.log(data);
  // caseId, partyId, title, uploadedBy, law, subject, requirement, honoringParty;

  // for (const key in data) {
  //   if (!data[key]) {
  //     toast.error(`${key} cannot be empty!`);
  //     return null;
  //   }
  // }

  try {
    const response = await fetcher("/documents/", {
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
