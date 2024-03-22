import { Toaster } from "react-hot-toast";
import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
import { COURT_FIELDS } from "../../utils/constants";
export default function CourtForm({ courtData }) {
  const courtFieldsWithValues = COURT_FIELDS.map(cf => { return {
    ...cf, value: courtData?.[cf.name] || ""
  }}); 

  return (
    <>
      <StyledForms
        className={"court-form"}
        formID="court-form"
        title="Court Details Form"
        method="POST"
        buttonText="ADD COURT"
        fields={courtFieldsWithValues}
      />
      <Toaster position="bottom-center" />
    </>
  );
}
