
import { Toaster } from "react-hot-toast";
import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
import { COURT_FIELDS } from "../../utils/constants";
// import { StyledForms } from "../assets/stylingWrappers/StyledForms";
export default function CourtForm() {

  
  return (
    <>
      <StyledForms
        className={"court-form"}
        formID="court-form"
        title="Court Details Form"
        method="POST"
        buttonText="ADD COURT"
        fields={COURT_FIELDS}
      />
      <Toaster position="bottom-center" />
    </>
  );
}