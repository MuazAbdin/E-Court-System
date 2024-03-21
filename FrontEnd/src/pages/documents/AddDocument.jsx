import { toast } from "react-toastify";
import StyledDocumentForm from "../../assets/stylingWrappers/StyledDocumentForm";
import { DOCUMENT_FIELDS } from "../../utils/constants";
import { fetcher } from "../../utils/fetcher";
import { redirect, useNavigate } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";

function AddDocument() {
  const navigate = useNavigate();
  return (
    <>
      <div className="back-btn c-flex" onClick={() => navigate("..")}>
        <FaAnglesLeft /> view case
      </div>
      <StyledDocumentForm
        formID="document-form"
        title="new document"
        method="POST"
        buttonText="submit"
        fields={DOCUMENT_FIELDS}
      ></StyledDocumentForm>
    </>
  );
}

export default AddDocument;

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]); // Extracting the Base64 string from the data URL
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function action({ params, request }) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );

  const { file, ...rest } = data;

  const fileData = {
    originalname: file.name,
    mimetype: file.type,
    buffer: await fileToBase64(file),
  };

  const reqData = {
    caseId: params.caseID,
    fileData,
    ...rest,
  };

  // for (const key in data) {
  //   if (!data[key]) {
  //     toast.error(`${key} cannot be empty!`);
  //     return null;
  //   }
  // }

  try {
    const response = await fetcher("/documents/", {
      method: request.method,
      body: JSON.stringify(reqData),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data);
    }

    toast.success("Created Successfully!");
    return redirect("..");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
