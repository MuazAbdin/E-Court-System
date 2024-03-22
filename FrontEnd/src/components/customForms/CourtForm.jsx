import { Toaster } from "react-hot-toast";
import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
import { COURT_FIELDS } from "../../utils/constants";
export default function CourtForm({ courtData }) {
  courtData && COURT_FIELDS.forEach(cf => {
    courtData[cf.id] = courtData[cf.name]
  })

  return (
    <>
      <StyledForms
        className={"court-form"}
        formID="court-form"
        title="Court Details Form"
        method="POST"
        buttonText="ADD COURT"
        fields={COURT_FIELDS}
        values={courtData}
      />
      <Toaster position="bottom-center" />
    </>
  );
}
