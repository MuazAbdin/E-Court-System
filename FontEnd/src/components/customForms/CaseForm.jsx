import { StyledRegisterForm } from "../../assets/stylingWrappers/StyledAuthForm";
import { CASE_FIELDS } from "../../utils/constants";

export default function CaseForm() {
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
