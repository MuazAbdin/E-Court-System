import StyledCaseForm from "../../assets/stylingWrappers/StyledCaseForm";

function EditCase() {
  return (
    <StyledCaseForm
      formID="case-form"
      title="edit claim"
      method="PATCH"
      buttonText="save"
      isEdit={true}
    />
  );
}

export default EditCase;
