import { useOutletContext } from "react-router-dom";
import { StyledRegisterForm } from "../assets/stylingWrappers/StyledAuthForm";

import { EDIT_USER_FIELDS } from "../utils/constants";
import { action as submitAction } from "../utils/submitAction";

function EditUserDetails() {
  const values = useOutletContext();
  return (
    <section className="content">
      <StyledRegisterForm
        formID="editDetails-form"
        title="edit details"
        method="PATCH"
        buttonText="save"
        values={values}
        fields={EDIT_USER_FIELDS}
      />
    </section>
  );
}

export default EditUserDetails;

export async function action({ params, request }) {
  return submitAction({ params, request });
}
