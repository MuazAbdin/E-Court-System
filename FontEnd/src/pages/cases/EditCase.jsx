import StyledCaseForm from "../../assets/stylingWrappers/StyledCaseForm";

function EditCase() {
  return (
    <StyledCaseForm
      formID="case-form"
      title="claim form"
      method="PATCH"
      buttonText="save"
      isEdit={true}
    />
  );
}

export default EditCase;
