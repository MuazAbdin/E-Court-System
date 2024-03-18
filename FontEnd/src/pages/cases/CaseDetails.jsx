import { Link, useLoaderData, useParams } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import { toast } from "react-toastify";
import StyledCaseForm from "../../assets/stylingWrappers/StyledCaseForm";
import { Table } from "../../components";
import { FaFileCirclePlus, FaTrashCan } from "react-icons/fa6";
import { RiUserAddFill } from "react-icons/ri";
import { MdEventNote } from "react-icons/md";

function CaseDetails() {
  const { caseID } = useParams();
  const { caseData } = useLoaderData(caseID);
  console.log(caseData);
  return (
    <StyledCaseForm
      formID="case-form"
      title="view case"
      method="PATCH"
      buttonText="save"
      values={caseData}
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
          <Link to="docments">
            <FaFileCirclePlus />
            add new document
          </Link>
        </div>
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
          <Link to="stakeholders">
            <RiUserAddFill />
            add new stakeholder
          </Link>
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
          <Link to="events">
            <MdEventNote />
            add new event
          </Link>
        </div>
      </section>
    </StyledCaseForm>
  );
  // return <ViewCase case={caseData} />;
}

export default CaseDetails;

export async function loader({ params }) {
  try {
    const { caseID } = params;
    // console.log(params);
    const response = await fetcher(`/cases/${caseID}`);
    if (!response.ok) throw response;
    const caseData = await response.json();
    return { caseData };
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
