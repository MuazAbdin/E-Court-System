import { StyledRegisterForm } from "../../assets/stylingWrappers/StyledAuthForm";
import { LEGAL_PARTY_FIELDS } from "../../utils/constants";

export default function PartyForm() {
  return (
    <StyledRegisterForm
      className={"party-form"}
      formID="party-form"
      title="Legal Party Details Form"
      method="POST"
      buttonText="SUBMIT"
      fields={LEGAL_PARTY_FIELDS}
    />
  );
}
