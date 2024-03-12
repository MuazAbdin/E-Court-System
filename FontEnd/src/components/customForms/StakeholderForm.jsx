import { StyledRegisterForm } from "../../assets/stylingWrappers/StyledAuthForm";
import { STAKEHOLDER_FIELDS } from "../../utils/constants";

export default function StakeholderForm() {
  return (
    <StyledRegisterForm
      className={"stakeholder-form"}
      formID="stakeholder-form"
      title="Stakeholder Details Form"
      method="POST"
      buttonText="SUBMIT"
      fields={STAKEHOLDER_FIELDS}
    />
  );
}
