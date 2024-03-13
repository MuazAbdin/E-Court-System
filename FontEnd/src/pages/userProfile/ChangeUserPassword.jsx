import { StyledEditDetailsForm } from "../../assets/stylingWrappers/StyledAuthForm";
import { CHANGE_PASSWORD_FIELDS } from "../../utils/constants";
import { action as submitAction } from "../../utils/submitAction";

function ChangeUserPassword() {
  return (
    <StyledEditDetailsForm
      formID="changePassword-form"
      title="change password"
      method="PATCH"
      buttonText="save"
      fields={CHANGE_PASSWORD_FIELDS}
    />
  );
}

export default ChangeUserPassword;

export async function action({ params, request }) {
  return submitAction({ params, request });
}
