import { Form, useNavigation } from "react-router-dom";
import StyledInputSelect from "../../assets/stylingWrappers/StyledInputSelect";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GavelIcon from "@mui/icons-material/Gavel";
import { FaRegFilePdf } from "react-icons/fa6";
import { PARTY_DETAILS_FIELDS } from "../../utils/constants";
import Input from "../Input";

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

  return (
    <Form method={method} id={formID} className={className} noValidate>
      <h3 className="title">{title}</h3>

      {isEdit ? (
        <CaseHeader formID={formID} values={values} />
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
        prevValue={isEdit ? values.title : ""}
      />

      <Input
        key={`${formID}-description`}
        label="Description"
        type="text"
        id={`${formID}-description`}
        required={!isEdit}
        multiline={true}
        rows={5}
        prevValue={isEdit ? values.description : ""}
        isSubmitted={false}
      />

      <CaseParties
        formID={formID}
        isEdit={isEdit}
        values={values?.parties || []}
      />

      <CaseNotes formID={formID} isEdit={isEdit} values={values} />

      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : `${buttonText}`}
      </button>

      {children}

      <button type="button" className="btn pdf-btn" onClick={handleGeneratePDF}>
        <FaRegFilePdf />
      </button>
    </Form>
  );
}

export default CaseForm;

const HEADER_FIELDS = [
  { label: "Case Number", id: "caseNumber" },
  { label: "Status", id: "status" },
  // {
  //   label: "Next Event",
  //   id: "nextEvent",
  //   icon: <EventNoteIcon />,
  // },
  {
    label: "Court",
    id: "court",
    icon: <AccountBalanceIcon />,
  },
  {
    label: "Judge",
    id: "judge",
    icon: <GavelIcon />,
  },
];

function CaseHeader({ formID, values }) {
  const { caseNumber, status, judge } = values;
  const court = values
    ? `${values.court.name} - ${values.court.city}`
    : undefined;
  const fieldValues = { caseNumber, status, court, judge };

  return (
    <section className="case-header">
      {HEADER_FIELDS.map((f) => (
        <Input
          key={`${formID}-${f.id}`}
          label={f.label}
          type="text"
          id={`${formID}-${f.id}`}
          icon={f.icon}
          readOnly={true}
          prevValue={fieldValues?.[f.id] || ""}
        />
      ))}
    </section>
  );
}

function CaseParties({ formID, isEdit, values }) {
  // console.log(values);
  return (
    <section className="parties">
      {["claimant", "respondent"].map((party) => {
        const partyDetails = values.find(
          (p) => p.name.toLowerCase() === party.toLowerCase()
        );

        return (
          <section key={party} className={party}>
            <h5 className="title">{party}</h5>
            <div className="client">
              {PARTY_DETAILS_FIELDS.map((f) => (
                <Input
                  key={`${formID}-${party}_${f.id}`}
                  label={f.label}
                  type="text"
                  id={`${formID}-${party}_${f.id}`}
                  icon={f.icon}
                  ref={null}
                  autoComplete={f.autoComplete ?? "off"}
                  validator={f.validator}
                  readOnly={isEdit && f.id === "idNumber"}
                  required={!isEdit && f.required}
                  severErrorMsg={""}
                  multiline={f.multiline ?? false}
                  rows={f.rows ?? undefined}
                  prevValue={partyDetails?.client[f.id] || ""}
                  isSubmitted={false}
                />
              ))}
            </div>
            <div className="lawyer">
              <Input
                key={`${formID}-${party}_lawyer`}
                label="Lawyer"
                type="text"
                id={`${formID}-${party}_lawyer`}
                readOnly={true}
                prevValue={
                  partyDetails
                    ? `${partyDetails.lawyer.firstName} ${partyDetails.lawyer.lastName}`
                    : ""
                }
              />
            </div>
          </section>
        );
      })}
    </section>
  );
}

function CaseNotes({ formID, isEdit, values }) {
  return (
    <section className="notes">
      <h5 className="title">Notes</h5>
      {["Claimant Lawyer", "Respondent Lawyer", "Judge"].map((side) => (
        <Input
          key={`${formID}-${side.split(" ").join("")}Notes`}
          label={`${side} Notes`}
          type="text"
          id={`${formID}-${side.split(" ").join("")}Notes`}
          severErrorMsg={""}
          multiline={true}
          rows={5}
          prevValue={isEdit ? values[`${side.split(" ").join("")}Notes`] : ""}
          isSubmitted={false}
        />
      ))}
    </section>
  );
}

async function handleGeneratePDF(event) {
  event.preventDefault();
  try {
    const response = await fetcher("/generatePDF");

    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }

    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Case Document.pdf";
    link.click();
  } catch (error) {
    console.error(error.message);
    toast.error("Error generating PDF");
  }
}
