import { Form, Link, useNavigation } from "react-router-dom";
import StyledInputSelect from "../../assets/stylingWrappers/StyledInputSelect";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GavelIcon from "@mui/icons-material/Gavel";
import { FaRegFilePdf } from "react-icons/fa6";
import { PARTY_DETAILS_FIELDS } from "../../utils/constants";
import Input from "../Input";
import { RiUserAddFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { fetcher } from "../../utils/fetcher";
import InputSwitch from "../InputSwitch";

function CaseForm({
  children,
  className,
  formID,
  title,
  method,
  buttonText,
  values,
  isEdit,
  courts,
}) {
  const courtsData = courts.map((c) => ({
    id: c._id,
    value: `${c.name} - ${c.city}`,
    icon: <AccountBalanceIcon />,
  }));

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { caseData, userData, judges, statusTypes } = values;
  const IDs = {
    ClaimantLawyer: caseData?.parties?.[0]?.lawyer?._id,
    RespondentLawyer: caseData?.parties?.[1]?.lawyer?._id,
    Judge: caseData?.judge?._id,
    CurUser: userData._id,
  };

  return (
    <Form method={method} id={formID} className={className} noValidate>
      <h3 className="title">{title}</h3>

      <input
        type="hidden"
        id={`${formID}-userData`}
        name={`${formID}-userData`}
        value={JSON.stringify(userData)}
      />

      { userData.userType === "Court Manager" &&
        <InputSwitch formID={formID} initialValue={caseData.public} />
      }

      {isEdit ? (
        <CaseHeader
          formID={formID}
          values={caseData}
          userType={userData.userType}
          judges={judges}
          statusTypes={statusTypes}
        />
      ) : (
        <StyledInputSelect
          id={`${formID}-court`}
          label="Court"
          menuItems={courtsData}
        />
      )}

      <Input
        key={`${formID}-title`}
        label="Title"
        type="text"
        id={`${formID}-title`}
        required={!isEdit}
        prevValue={isEdit ? caseData.title : ""}
        readOnly={isEdit && userData.userType !== "Court Manager"}
      />

      <Input
        key={`${formID}-description`}
        label="Description"
        type="text"
        id={`${formID}-description`}
        required={!isEdit}
        multiline={true}
        rows={5}
        prevValue={isEdit ? caseData.description : ""}
        isSubmitted={false}
        readOnly={isEdit && userData.userType !== "Court Manager"}
      />

      <CaseParties
        formID={formID}
        isEdit={isEdit}
        values={{ partiesData: caseData?.parties || [], userData }}
        IDs={IDs}
      />

      <CaseNotes
        formID={formID}
        isEdit={isEdit}
        values={{ caseData, userData }}
        IDs={IDs}
      />

      { userData.userType !== "Visitor" &&
        <button name="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "submitting ..." : `${buttonText}`}
        </button>
      }

      {children}

      {isEdit && (
        <button
          type="button"
          className="btn pdf-btn"
          onClick={(event) => handleGeneratePDF(event, caseData._id)}
        >
          <FaRegFilePdf />
        </button>
      )}
    </Form>
  );
}

export default CaseForm;

const HEADER_FIELDS = [
  { label: "Case Number", id: "caseNumber" },
  {
    label: "Court",
    id: "court",
    icon: <AccountBalanceIcon />,
  },
];

function CaseHeader({ formID, values, userType, judges, statusTypes }) {
  const { caseNumber, status, judge } = values;
  const court = values
    ? `${values.court.name} - ${values.court.city}`
    : undefined;
  const fieldValues = { caseNumber, court };
  const judgeName = judge ? `${judge.firstName} ${judge.lastName}` : "";

  const judgesData = judges.map((j) => {
    return {
      id: j._id,
      value: `${j.firstName} ${j.lastName}`,
      icon: <GavelIcon />,
    };
  });

  const statusTypesData = statusTypes.map((st) => {
    return {
      id: st,
      value: st,
    };
  });

  return (
    <section className="case-header">
      {HEADER_FIELDS.map((f) => (
        <Input
          key={`${formID}-${f.id}`}
          label={f.label}
          type="text"
          id={`${formID}-${f.id}`}
          icon={f.icon}
          readOnly={
            userType !== "Court Manager" || !["status", "judge"].includes(f.id)
          }
          prevValue={fieldValues?.[f.id] || ""}
        />
      ))}

      {(userType !== "Court Manager" && (
        <Input
          key={`${formID}-judge`}
          label="judge"
          type="text"
          id={`${formID}-judge`}
          icon={<GavelIcon />}
          prevValue={judgeName || ""}
          readOnly={true}
        />
      )) || (
        <StyledInputSelect
          id={`${formID}-judge`}
          label="Judge"
          menuItems={judgesData}
          initValue={judge?._id || ""}
        />
      )}
      {(userType === "Lawyer" && (
        <Input
          key={`${formID}-status`}
          label="status"
          type="text"
          id={`${formID}-status`}
          icon={<GavelIcon />}
          prevValue={status || ""}
          readOnly={true}
        />
      )) || (
        <StyledInputSelect
          id={`${formID}-status`}
          label="Status"
          menuItems={statusTypesData}
          initValue={status}
        />
      )}
    </section>
  );
}

function CaseParties({ formID, isEdit, values, IDs }) {
  const { partiesData, userData } = values;
  return (
    <section className="parties">
      {["claimant", "respondent"].map((party) => {
        const partyDetails = partiesData.find(
          (p) => p.name.toLowerCase() === party.toLowerCase()
        );
        const IDsKey = party.charAt(0).toUpperCase() + party.slice(1);
        const isPartyLawyer = userData._id == IDs[`${IDsKey}Lawyer`];

        const partyDetailsField = [ ...PARTY_DETAILS_FIELDS ];
        if(userData.userType === "Visitor") {
          partyDetailsField.splice(3);
          partyDetailsField.splice(0, 1);
        }

        return (
          <section key={party} className={party}>
            <h5 className="title">{party}</h5>
            <div className="client">
              <input
                type="hidden"
                id={`${formID}-${party}_id`}
                name={`${formID}-${party}_id`}
                value={partyDetails?.client?._id || ""}
              />
              {partyDetailsField.map((f) => (
                <Input
                  key={`${formID}-${party}_${f.id}`}
                  label={f.label}
                  type="text"
                  id={`${formID}-${party}_${f.id}`}
                  icon={f.icon}
                  ref={null}
                  autoComplete={f.autoComplete ?? "off"}
                  validator={f.validator}
                  readOnly={
                    !(!isEdit || isPartyLawyer)
                    || (isEdit && f.id === "idNumber")
                  }
                  required={!isEdit && f.required}
                  severErrorMsg={""}
                  multiline={f.multiline ?? false}
                  rows={f.rows ?? undefined}
                  prevValue={partyDetails?.client[f.id] || ""}
                  isSubmitted={false}
                />
              ))}
            </div>
            {isEdit && (
              <div className="lawyer">
                <Input
                  key={`${formID}-${party}_lawyer`}
                  label="Lawyer"
                  type="text"
                  id={`${formID}-${party}_lawyer`}
                  readOnly={true}
                  prevValue={
                    partyDetails?.lawyer
                      ? `${partyDetails.lawyer.firstName} ${partyDetails.lawyer.lastName}`
                      : ""
                  }
                />
              </div>
            )}
            {isEdit && userData.userType !== "Visitor" && (
              <div
                className={`btn add-stakeholder c-flex ${
                  isPartyLawyer ? "" : "disabled-link"
                }`}
              >
                <Link
                  to={partyDetails ? `stakeholders/${partyDetails._id}` : ""}
                >
                  <RiUserAddFill />
                  add new witness
                </Link>
              </div>
            )}
          </section>
        );
      })}
    </section>
  );
}

function CaseNotes({ formID, isEdit, values, IDs }) {
  const { caseData, userData } = values;

  return (
    <section className="notes">
      <h5 className="title">Notes</h5>
      {["Claimant Lawyer", "Respondent Lawyer", "Judge"].map((side) => {
        if (!isEdit && side !== "Claimant Lawyer") return;
        let sideValue = `${side.split(" ").join("")}Notes`;
        sideValue = sideValue.charAt(0).toLowerCase() + sideValue.slice(1);

        const readOnly = !(userData._id == IDs[`${side.split(" ").join("")}`] || !isEdit);

        return (
          <Input
            key={`${formID}-${sideValue}`}
            label={`${side} Notes`}
            type="text"
            id={`${formID}-${sideValue}`}
            readOnly={readOnly}
            severErrorMsg={""}
            multiline={true}
            rows={5}
            prevValue={isEdit ? caseData[sideValue] : ""}
            isSubmitted={false}
          />
        );
      })}
    </section>
  );
}

async function handleGeneratePDF(event, caseId) {
  event.preventDefault();
  try {
    const response = await fetcher(`/cases/pdf/${caseId}`);

    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }

    const blob = await response.blob();
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, "_blank");
  } catch (error) {
    toast.error(error.message);
  }
}
