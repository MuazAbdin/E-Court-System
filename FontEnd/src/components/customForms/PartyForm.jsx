import{ useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
import { LEGAL_PARTY_FIELDS } from "../../utils/constants";



export default function PartyForm() {
  const [partyName, setPartyName] = useState("");
  const [lawyer, setLawyer] = useState("");
  const [caseId, setCaseId] = useState("");
  const [stakeholders, setStakeholders] = useState([]);
  const [newStakeholder, setNewStakeholder] = useState("");
  const navigate = useNavigate();

  const handleAddStakeholder = () => {
    if (newStakeholder.trim() !== "") {
      setStakeholders([...stakeholders, newStakeholder]);
      setNewStakeholder("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = [
      { name: "Party Name", value: partyName },
      { name: "Lawyer", value: lawyer },
      { name: "Case ID", value: caseId },
      { name: "Stakeholder", value: stakeholders },
    ];
    for (const field of fields) {
      if (!field.value) {
        toast.error(`${field.name} cannot be empty!`);
        return;
      }
    }
  };
  return (
    // <Wrapper>
    //   <form>
    //     <h2>Legal Party Details Form</h2>
    //     <TextField
    //       label="Party Name"
    //       variant="outlined"
    //       value={partyName}
    //       onChange={(e) => setPartyName(e.target.value)}
    //     />
    //     <div className="case-lawyer">
    //       <TextField
    //         label="Case ID"
    //         variant="outlined"
    //         value={caseId}
    //         onChange={(e) => setCaseId(e.target.value)}
    //       />
    //     <TextField
    //       label="Lawyer"
    //       variant="outlined"
    //       value={lawyer}
    //       onChange={(e) => setLawyer(e.target.value)}
    //     />
    //     </div>
    //     <TextField
    //       label="Stakeholder"
    //       variant="outlined"
    //       value={newStakeholder}
    //       onChange={(e) => setNewStakeholder(e.target.value)}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="end">
    //             <IconButton className="plus" title="add stakeholder" onClick={handleAddStakeholder}>+</IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //     {stakeholders.map((stakeholder, index) => (
    //       <TextField
    //         key={index}
    //         label={`Stakeholder ${index + 1}`}
    //         variant="standard"
    //         value={stakeholder}
    //         disabled
    //       />
    //     ))}
    //     <button onClick={handleSubmit}>SUBMIT</button>

    //     <Toaster position="bottom-center" />
    //   </form>
    // </Wrapper>
    <>
      <StyledForms
        className={"party-form"}
        formID="party-form"
        title="Legal Party Details Form"
        method="POST"
        buttonText="SUBMIT"
        fields={LEGAL_PARTY_FIELDS}

      >
        <button className="pdf-btn" onClick={() => navigate(`/dashboard/stakeholder`)}>
          Add Stakeholder
        </button>
      </StyledForms>
      <Toaster position="bottom-center" />
    </>
  );
}