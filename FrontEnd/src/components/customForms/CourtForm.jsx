import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
import { COURT_FIELDS } from "../../utils/constants";
export default function CourtForm({
  courtData,
  readOnly,
  noSubmit,
  buttonText,
}) {
  courtData &&
    COURT_FIELDS.forEach((cf) => {
      courtData[cf.id] = courtData[cf.name];
    });
  const itemId = courtData?._id;

  return (
    <StyledForms
      className={"court-form"}
      formID="court-form"
      title="Court Details Form"
      method="POST"
      buttonText={buttonText || "ADD COURT"}
      fields={COURT_FIELDS}
      values={courtData}
      readOnly={readOnly}
      noSubmit={noSubmit}
      itemId={itemId}
    />
  );
}
