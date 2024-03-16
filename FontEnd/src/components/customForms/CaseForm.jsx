import { Form, useNavigation } from "react-router-dom";
import StyledInputSelect from "../../assets/stylingWrappers/StyledInputSelect";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditNoteIcon from "@mui/icons-material/EditNote";
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

  const handleGeneratePDF = async (event) => {
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
  };

  return (
    <Form method={method} id={formID} className={className} noValidate>
      <h3 className="title">{title}</h3>

      {!isEdit ? (
        <StyledInputSelect
          id={`${formID}-court`}
          label="Court"
          menuItems={courtsData}
        />
      ) : (
        <Input
          key={`${formID}-court`}
          label="Court"
          type="text"
          id={`${formID}-court`}
          icon={<AccountBalanceIcon />}
          readOnly={true}
          prevValue={"Supreme Court - Jerusalem"}
        />
      )}

      <div className="parties">
        {["claimant", "respondent"].map((party) => (
          <section key={party} className={party}>
            <h5 className="title">{party}</h5>
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
                required={f.required}
                severErrorMsg={""}
                multiline={f.multiline ?? false}
                rows={f.rows ?? undefined}
                prevValue={""}
                isSubmitted={false}
              />
            ))}
          </section>
        ))}
      </div>

      <Input
        key={`${formID}-title`}
        label="Title"
        type="text"
        id={`${formID}-title`}
        icon={null}
        ref={null}
        autoComplete="off"
        required={true}
        severErrorMsg={""}
        multiline={false}
        prevValue={""}
        isSubmitted={false}
      />

      <Input
        key={`${formID}-description`}
        label="Description"
        type="text"
        id={`${formID}-description`}
        icon={<EditNoteIcon />}
        ref={null}
        autoComplete="off"
        required={true}
        severErrorMsg={""}
        multiline={true}
        rows={7}
        prevValue={""}
        isSubmitted={false}
      />

      {children}

      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : `${buttonText}`}
      </button>

      <button type="button" className="btn pdf-btn" onClick={handleGeneratePDF}>
        <FaRegFilePdf />
      </button>
    </Form>
  );
}

export default CaseForm;

// import { useEffect, useState } from "react";
// import {
//   InputLabel,
//   ListItemIcon,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import toast, { Toaster } from "react-hot-toast";
// import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import Person3Icon from "@mui/icons-material/Person3";
// import { fetcher } from "../../utils/fetcher";
// import { CASE_FIELDS, CLIENT_CASE_FIELDS } from "../../utils/constants";

// export default function CaseForm() {
//   // const addParty = (e) => {
//   //   e.preventDefault();
//   //   if (newParty.trim() !== "") {
//   //     setParties((parties) => [...parties, newParty]);
//   //     setNewParty("");
//   //   }
//   // };

//   const [courts, setCourts] = useState([]);
//   const [selectedCourt, setSelectedCourt] = useState("");
//   const [judges, setJudges] = useState({});

//   useEffect(() => {
//     const getCourts = async () => {
//       try {
//         const courtResponse = await fetcher("/courts");
//         if (courtResponse.ok) {
//           const courtsData = await courtResponse.json();
//           setCourts(courtsData);
//         } else {
//           throw new Error("Failed to fetch courts");
//         }
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };
//     getCourts();
//   }, []);

//   const handleCourtsJudges = async (event) => {
//     const value = event.target.value;
//     setSelectedCourt(value);

//     try {
//       const judgeResponse = await fetcher(
//         `/users/judges?court=${selectedCourt}`
//       );
//       if (judgeResponse.ok) {
//         const judgeData = await judgeResponse.json();
//         setJudges(judgeData);
//       } else {
//         throw new Error("Failed to fetch judges");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

// const handleGeneratePDF = async () => {
//   try {
//     const response = await fetcher("/generatePDF", {
//       method: "GET",
//       headers: {
//         Accept: "application/pdf",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to generate PDF");
//     }

//     const blob = await response.blob();

//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.download = "Case Document.pdf";
//     link.click();
//   } catch (error) {
//     console.error(error.message);
//     toast.error("Error generating PDF");
//   }
// };
//   return (
//     <>
//       <StyledForms
//         className={"case-form"}
//         formID="case-form"
//         title="Legal Case Information Form"
//         method="POST"
//         buttonText="SUBMIT"
//         fields={[...CASE_FIELDS, ...CLIENT_CASE_FIELDS]}
//       >
//         <div className="court-judge">
//           <InputLabel id="court-dropdown-label">Court</InputLabel>
//           <Select
//             labelId="court-dropdown-label"
//             id="court-dropdown"
//             variant="standard"
//             value={selectedCourt}
//             onChange={handleCourtsJudges}
//           >
//             <MenuItem value={10}>
//               {" "}
//               <ListItemIcon>
//                 <AccountBalanceIcon />
//               </ListItemIcon>
//               court 1
//             </MenuItem>

//             <MenuItem value={120}>
//               <ListItemIcon>
//                 <AccountBalanceIcon />
//               </ListItemIcon>
//               court 2
//             </MenuItem>
//             {courts.map((court) => (
//               <MenuItem key={court._id} value={court._id}>
//                 <ListItemIcon>
//                   <AccountBalanceIcon />
//                 </ListItemIcon>
//                 {court.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>
//         <div className="court-judge">
//           <InputLabel id="judge-dropdown-label">Judge</InputLabel>
//           <Select
//             labelId="judge-dropdown-label"
//             id="judge-dropdown"
//             variant="standard"
//             value={judges}
//             onChange={(e) => setJudges(e.target.value)}
//           >
//             <MenuItem value={10}>
//               <ListItemIcon>
//                 <Person3Icon />
//               </ListItemIcon>
//               Judge 1
//             </MenuItem>
//             <MenuItem value={20}>
//               <ListItemIcon>
//                 <Person3Icon />
//               </ListItemIcon>
//               Judge 2
//             </MenuItem>
//             <MenuItem value={30}>
//               <ListItemIcon>
//                 <Person3Icon />
//               </ListItemIcon>
//               Judge 3
//             </MenuItem>

//             {Object.keys(judges).map((judge) => (
//               <MenuItem key={judge.idNumber} value={judge.idNumber}>
//                 <ListItemIcon>
//                   <Person3Icon />
//                 </ListItemIcon>
//                 {judge.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>
// <button className="pdf-btn" onClick={handleGeneratePDF}>
//   Generate PDF
// </button>
//       </StyledForms>
//       <Toaster position="bottom-center" />
//     </>
//   // )
// }
