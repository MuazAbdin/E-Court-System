import { useOutletContext } from "react-router-dom";
import { StyledEditDetailsForm } from "../../assets/stylingWrappers/StyledAuthForm";

import { EDIT_USER_FIELDS } from "../../utils/constants";
import { action as submitAction } from "../../utils/submitAction";

function EditUserDetails() {
  const { userData } = useOutletContext();
  const {
    IDcard,
    firstName,
    lastName,
    email,
    mobile,
    city,
    street,
    userType,
    ...rest
  } = userData;
  const user = {
    IDcard,
    firstName,
    lastName,
    email,
    mobile,
    city,
    street,
    userType,
  };
  return (
    <StyledEditDetailsForm
      formID="editDetails-form"
      title="edit details"
      method="PATCH"
      buttonText="save"
      values={user}
      fields={EDIT_USER_FIELDS}
    />
  );
}

export default EditUserDetails;

export async function action({ params, request }) {
  return submitAction({ params, request });
}
