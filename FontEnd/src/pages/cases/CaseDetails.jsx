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
  const { caseData, docsData } = useLoaderData(caseID);
  console.log({ caseData, docsData });
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
      <section className="stakeholders">
        <h5 className="section-title">witnesses</h5>
        <Table tableHeader={["", "name", "party", ""]}>
          {caseData.parties.map((p) => {
            const partyName = p.name;
            const witnesses = p.stakeholders
              .filter((s) => s.type === "Witness")
              .map((s) => `${s.firstName} ${s.lastName}`);
            return witnesses.map((w) => (
              <tr key={w}>
                <td>{w}</td>
                <td>{partyName}</td>
                <td>
                  <FaTrashCan />
                </td>
              </tr>
            ));
          })}
        </Table>
        {/* <div className="btn add-stakeholder c-flex">
          <Link to="stakeholders">
            <RiUserAddFill />
            add new stakeholder
          </Link>
        </div> */}
      </section>

      <section className="documents">
        <h5 className="section-title">documents</h5>
        <Table tableHeader={["", "party", "title", ""]}>
          {docsData.map((d) => (
            <tr key={d._id}>
              <td>{d.party.name}</td>
              <td>{d.title}</td>
              <td>
                <FaTrashCan />
              </td>
            </tr>
          ))}
        </Table>
        <div className="btn add-doc c-flex">
          <Link to="docments">
            <FaFileCirclePlus />
            add new document
          </Link>
        </div>
      </section>

      <section className="events">
        <h5 className="section-title">events</h5>
        <Table tableHeader={["", "date", "location", "type", ""]}>
          {caseData.events.map((e) => (
            <tr key={e._id}>
              <td>{e.date}</td>
              <td>{e.location}</td>
              <td>{e.type}</td>
              <td>
                <FaTrashCan />
              </td>
            </tr>
          ))}
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
    const caseResponse = await fetcher(`/cases/${caseID}`);
    if (!caseResponse.ok) throw caseResponse;
    const caseData = await caseResponse.json();
    const docsResponse = await fetcher(`/documents/case/${caseID}`);
    if (!docsResponse.ok) throw docsResponse;
    // {
    //   const message = docsResponse.text();
    //   if (message !== "No documents found!") throw docsResponse;
    // }
    const docsData = await docsResponse.json();
    // console.log(docsData);
    return { caseData, docsData };
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
