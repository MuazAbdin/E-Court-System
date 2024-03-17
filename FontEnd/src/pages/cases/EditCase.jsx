import StyledCaseForm from "../../assets/stylingWrappers/StyledCaseForm";
import { IoIosPeople } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { DOCUMENT_FIELDS } from "../../utils/constants";
import { Input, InputFileUpload, Table } from "../../components";
import { FaFileCirclePlus, FaTrashCan } from "react-icons/fa6";
import { RiUserAddFill } from "react-icons/ri";
import { MdEventNote } from "react-icons/md";
import { Link } from "react-router-dom";

function EditCase() {
  return (
    <StyledCaseForm
      formID="case-form"
      title="view case"
      method="PATCH"
      buttonText="save"
      isEdit={true}
      courts={[]}
    >
      {/* {DOCUMENT_FIELDS.map((f) => (
          <Input
            key={`case-form-${f.id}`}
            label={f.label}
            type={f.type}
            id={`case-form-${f.id}`}
            icon={f.icon}
            ref={null}
            autoComplete={f.autoComplete ?? "off"}
            validator={f.validator}
            required={f.required}
            severErrorMsg={""}
            multiline={f.multiline ?? false}
            rows={f.rows ?? undefined}
            prevValue={""}
            isSubmitted={false}
          />
        ))}
        <InputFileUpload /> */}
    </StyledCaseForm>
  );
}

export default EditCase;
