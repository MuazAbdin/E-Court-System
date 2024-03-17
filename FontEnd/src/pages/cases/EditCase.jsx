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
      <section className="documents">
        <h5 className="section-title">documents</h5>
        <Table tableHeader={["", "party", "title", ""]}>
          <tr>
            <td>party 1</td>
            <td>doc 1</td>
            <td>
              <FaTrashCan />
            </td>
          </tr>
        </Table>
        <div className="btn add-doc c-flex">
          <Link to="">
            <FaFileCirclePlus />
            add new document
          </Link>
        </div>

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
      </section>
      <section className="stakeholders">
        <h5 className="section-title">stakeholders</h5>
        <Table tableHeader={["", "name", "party", ""]}>
          <tr>
            <td>name 1</td>
            <td>party 1</td>
            <td>
              <FaTrashCan />
            </td>
          </tr>
        </Table>
        <div className="btn add-stakeholder c-flex">
          <RiUserAddFill />
          add new stakeholder
        </div>
      </section>
      <section className="events">
        <h5 className="section-title">events</h5>
        <Table tableHeader={["", "date", "time", "location", "type", ""]}>
          <tr>
            <td>date 1</td>
            <td>time 1</td>
            <td>loc 1</td>
            <td>type 1</td>
            <td>
              <FaTrashCan />
            </td>
          </tr>
        </Table>
        <div className="btn add-event c-flex">
          <MdEventNote />
          add new event
        </div>
      </section>
    </StyledCaseForm>
  );
}

export default EditCase;
