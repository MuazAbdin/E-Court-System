import StyledCaseForm from "../../assets/stylingWrappers/StyledCaseForm";
import { IoIosPeople } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";

function EditCase() {
  return (
    <StyledCaseForm
      formID="case-form"
      title="edit claim"
      method="PATCH"
      buttonText="save"
      isEdit={true}
    >
      <div className="btn-group c-flex">
        <button className="btn c-flex">
          <IoDocuments /> <span>documents</span>
        </button>
        <button className="btn c-flex">
          <IoIosPeople /> <span>stackholders</span>
        </button>
      </div>
    </StyledCaseForm>
  );
}

export default EditCase;
