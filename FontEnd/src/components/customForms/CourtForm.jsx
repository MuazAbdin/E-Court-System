import { StyledRegisterForm } from "../../assets/stylingWrappers/StyledAuthForm";
import { COURT_FIELDS } from "../../utils/constants";

export default function CourtForm() {
  return (
    <StyledRegisterForm
      className={"court-form"}
      formID="court-form"
      title="Court Details Form"
      method="POST"
      buttonText="ADD COURT"
      fields={COURT_FIELDS}
    />
  );
}
