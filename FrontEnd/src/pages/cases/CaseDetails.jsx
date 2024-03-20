import {
  Link,
  redirect,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import { toast } from "react-toastify";
import StyledCaseForm from "../../assets/stylingWrappers/StyledCaseForm";
import { Table } from "../../components";
import { FaFileCirclePlus, FaTrashCan } from "react-icons/fa6";
import { RiUserAddFill } from "react-icons/ri";
import { MdEventNote } from "react-icons/md";
import dayjs from "dayjs";

function CaseDetails() {
  const { caseID } = useParams();
  const { caseData, docsData, judges, statusTypes } = useLoaderData(caseID);
  const { userData } = useOutletContext();
  console.log({ caseData, docsData, userData });
  return (
    <StyledCaseForm
      formID="case-form"
      title="view case"
      method="PATCH"
      buttonText="save"
      values={{ caseData, userData, judges, statusTypes }}
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
        <Table tableHeader={["", "date", "Time", "location", "type", ""]}>
          {caseData.events.map((e) => (
            <tr key={e._id}>
              <td>{dayjs(e.date).format("DD MMM YYYY")}</td>
              <td>{dayjs.utc(e.date).format("HH:mm")}</td>
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
}

export default CaseDetails;

export async function loader({ params }) {
  try {
    const { caseID } = params;
    const caseResponse = await fetcher(`/cases/${caseID}`);
    if (!caseResponse.ok) throw caseResponse;
    const caseData = await caseResponse.json();
    const docsResponse = await fetcher(`/documents/case/${caseID}`);
    if (!docsResponse.ok) throw docsResponse;
    const docsData = await docsResponse.json();
    const judgesResponse = await fetcher(`/users/judges/`);
    if (!judgesResponse.ok) throw judgesResponse;
    const judges = await judgesResponse.json();
    const statusTypesResponse = await fetcher(`/types/case-status-types`);
    if (!statusTypesResponse.ok) throw statusTypesResponse;
    const statusTypes = await statusTypesResponse.json();
    return { caseData, docsData, judges, statusTypes };
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}

export async function action({ params, request }) {
  const { caseID } = params;
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );

  const {
    status,
    court,
    judge,
    title,
    description,
    claimantLawyerNotes,
    respondentLawyerNotes,
    judgeNotes,
  } = data;

  const claimant = getPartyDetails("claimant_", data);
  const respondent = getPartyDetails("respondent_", data);

  const reqBody = {
    caseId: caseID,
    status,
    court,
    judge,
    title,
    description,
    claimantLawyerNotes,
    respondentLawyerNotes,
    judgeNotes,
    parties: [],
  };

  if (claimant)
    reqBody.parties.push({
      client: { ...claimant },
    });
  if (respondent)
    reqBody.parties.push({
      client: { ...respondent },
    });

  console.log(reqBody);

  try {
    const response = await fetcher("/cases", {
      method: request.method,
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data);
    }

    toast.success("Updated Successfully!");
    return redirect("");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}

function getPartyDetails(party, data) {
  const details = {};
  for (const k in data) {
    if (!k.includes(party)) continue;
    details[k.split("_")[1]] = data[k];
  }
  const { mobile, ...rest } = details;
  const filledKeys = Object.keys(rest).filter((k) => rest[k].trim().length > 0);
  return filledKeys.length > 0 ? rest : null;
}
