import { useEffect, useState } from "react";
import {
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Person3Icon from "@mui/icons-material/Person3";
import { fetcher } from "../../utils/fetcher";
import { CASE_FIELDS, CLIENT_CASE_FIELDS } from "../../utils/constants";


export default function CaseForm() {
  // const addParty = (e) => {
  //   e.preventDefault();
  //   if (newParty.trim() !== "") {
  //     setParties((parties) => [...parties, newParty]);
  //     setNewParty("");
  //   }
  // };

  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState("");
  const [judges, setJudges] = useState({});

  useEffect(() => {
    const getCourts = async () => {
      try {
        const courtResponse = await fetcher("/courts");
        if (courtResponse.ok) {
          const courtsData = await courtResponse.json();
          setCourts(courtsData);
        } else {
          throw new Error("Failed to fetch courts");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getCourts();
  }, []);

  const handleCourtsJudges = async (event) => {
    const value = event.target.value;
    setSelectedCourt(value);

    try {
      const judgeResponse = await fetcher(
        `/users/judges?court=${selectedCourt}`
      );
      if (judgeResponse.ok) {
        const judgeData = await judgeResponse.json();
        setJudges(judgeData);
      } else {
        throw new Error("Failed to fetch judges");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const response = await fetcher("/generatePDF", {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
      });

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
    <>
      <StyledForms
        className={"case-form"}
        formID="case-form"
        title="Legal Case Information Form"
        method="POST"
        buttonText="SUBMIT"
        fields={[...CASE_FIELDS, ...CLIENT_CASE_FIELDS]}
      >
        <div className="court-judge">
          <InputLabel id="court-dropdown-label">Court</InputLabel>
          <Select
            labelId="court-dropdown-label"
            id="court-dropdown"
            variant="standard"
            value={selectedCourt}
            onChange={handleCourtsJudges}
          >
            <MenuItem value={10}>
              {" "}
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              court 1
            </MenuItem>

            <MenuItem value={120}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              court 2
            </MenuItem>
            {courts.map((court) => (
              <MenuItem key={court._id} value={court._id}>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                {court.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="court-judge">
          <InputLabel id="judge-dropdown-label">Judge</InputLabel>
          <Select
            labelId="judge-dropdown-label"
            id="judge-dropdown"
            variant="standard"
            value={judges}
            onChange={(e) => setJudges(e.target.value)}
          >
            <MenuItem value={10}>
              <ListItemIcon>
                <Person3Icon />
              </ListItemIcon>
              Judge 1
            </MenuItem>
            <MenuItem value={20}>
              <ListItemIcon>
                <Person3Icon />
              </ListItemIcon>
              Judge 2
            </MenuItem>
            <MenuItem value={30}>
              <ListItemIcon>
                <Person3Icon />
              </ListItemIcon>
              Judge 3
            </MenuItem>

            {Object.keys(judges).map((judge) => (
              <MenuItem key={judge.idNumber} value={judge.idNumber}>
                <ListItemIcon>
                  <Person3Icon />
                </ListItemIcon>
                {judge.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <button className="pdf-btn" onClick={handleGeneratePDF}>
          Generate PDF
        </button>
      </StyledForms>
      <Toaster position="bottom-center" />
    </>
  );
}