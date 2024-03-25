import {
  Link,
  redirect,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { BASE_URL, fetcher } from "../../utils/fetcher";
import { toast } from "react-toastify";
import StyledCaseForm from "../../assets/stylingWrappers/StyledCaseForm";
import { Table } from "../../components";
import { FaFileCirclePlus, FaTrashCan, FaDownload } from "react-icons/fa6";
import { RiUserAddFill } from "react-icons/ri";
import { MdEventNote } from "react-icons/md";
import dayjs from "dayjs";

function CaseDetails() {
  const { caseID } = useParams();
  const { userData } = useOutletContext();
  const { caseData, docsData, judges, statusTypes } = useLoaderData(caseID);
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
      </section>

      { userData.userType !== "Visitor" &&
        <section className="documents">
          <h5 className="section-title">documents</h5>
          <Table tableHeader={["", "party", "title", "", ""]}>
            {docsData.map((d) => (
              <tr key={d._id}>
                <td>{d.party.name}</td>
                <td>{d.title}</td>
                <td>
                  <FaDownload
                    onClick={(event) => handleDownloadDocument(event, d._id)}
                  />
                </td>
                <td>
                  <FaTrashCan />
                </td>
              </tr>
            ))}
          </Table>
          {"Lawyer" === userData.userType && (
            <div className="btn add-doc c-flex">
              <Link to="docments">
                <FaFileCirclePlus />
                add new document
              </Link>
            </div>
          )}
        </section>
      }

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
        {"Court Manager" === userData.userType && (
          <div className="btn add-event c-flex">
            <Link to="events">
              <MdEventNote />
              add new event
            </Link>
          </div>
        )}
      </section>
    </StyledCaseForm>
  );
}

export default CaseDetails;

async function handleDownloadDocument(event, caseId) {
  event.preventDefault();
  try {
    window.open(BASE_URL + `/documents/download/${caseId}`, "_blank");
    return;
    // const response = await fetcher(`/documents/download/${caseId}`);

    // if (!response.ok) {
    //   throw new Error("Failed to download document");
    // }

    // const blob = await response.blob();
    // const fileURL = URL.createObjectURL(blob);
    // window.open(fileURL, "_blank");
  } catch (error) {
    toast.error(error.message);
  }
}

export async function loader({ params }) {
  try {
    const { caseID } = params;
    const caseResponse = await fetcher(`/cases/${caseID}`);
    if (!caseResponse.ok) throw caseResponse;
    const caseData = await caseResponse.json();

    const docsResponse = await fetcher(`/documents/case/${caseID}`);
    const docsData = docsResponse.ok ? await docsResponse.json() : [];

    const judgesResponse = await fetcher(`/users/judges/`);
    const judges = judgesResponse.ok ? await judgesResponse.json() : [];
    
    const statusTypesResponse = await fetcher(`/types/case-status-types`);
    const statusTypes = statusTypesResponse ? await statusTypesResponse.json() : [];
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
    userData,
    public: public_,
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
  const { userType, _id: userId } = JSON.parse(userData);

  const caseReqBody = {
    public: public_ === "on",
    caseId: caseID,
    status,
    court,
    judge,
    title,
    description,
    claimantLawyerNotes,
    respondentLawyerNotes,
    judgeNotes,
    // parties: [],
  };

  try {
    if (userType === "Lawyer") {
      delete caseReqBody.judge;


      if (claimant) {
        const response = await fetcher("/stakeholders/", {
          method: "PUT",
          body: JSON.stringify(claimant),
        });
        if (!response.ok) {
          toast.error("Failed to update claimant data!");
          toast.error(await response.text());
        }
      }
      if (respondent) {
        const response = await fetcher("/stakeholders/", {
          method: "PUT",
          body: JSON.stringify(respondent),
        });
        if (!response.ok) {
          toast.error("Failed to update claimant data!");
          toast.error(await response.text());
        }
      }
    }

    const response = await fetcher("/cases/", {
      method: request.method,
      body: JSON.stringify(caseReqBody),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data);
    }

    toast.success("Updated Case Successfully!");
    return redirect("");
  } catch (error) {
    if(error.status === 401) {
      toast.error(error.message);
    }
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
