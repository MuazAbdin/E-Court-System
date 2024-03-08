import React, { useState } from "react";
import Wrapper from "../assets/stylingWrappers/CaseForm";
import {
  Button,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import toast, { Toaster } from "react-hot-toast";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Person3Icon from "@mui/icons-material/Person3";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function CaseForm() {
  const [caseTitle, setCaseTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [parties, setParties] = useState("");
  const [court, setCourt] = useState("");
  const [judge, setJudge] = useState("");
  const [value, setValue] = useState("");
  const [newParty, setNewParty] = useState("");
  const [parties, setParties] = useState([]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = [
      { name: "Case Title", value: caseTitle },
      { name: "Description", value: description },
      { name: "Parties", value: parties },
      { name: "Status", value: status },
      { name: "Court", value: court },
      { name: "Judge", value: judge },
    ];
    for (const field of fields) {
      if (!field.value) {
        toast.error(`${field.name} cannot be empty!`);
        return;
      }
    }
  };
  const addParty = () => {
    if (newParty.trim() !== "") {
      setParties((parties) => [...parties, newParty]);
      setNewParty("");
    }
  };

  return (
    <Wrapper>
      <form>
        <h2>Legal Case Information Form</h2>
        <TextField
          label="Case Title"
          variant="outlined"
          title="case title"
          value={caseTitle}
          onChange={(e) => setCaseTitle(e.target.value)}
          //   InputProps={{
          //     endAdornment: (
          //       <InputAdornment position="end">
          //         <TitleIcon />
          //       </InputAdornment>
          //     ),
          //   }}
        />
        <div className="description">
          <TextField
            label="Description"
            variant="outlined"
            title="case description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EditNoteIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* <TextField
          label="Status"
          variant="outlined"
          title="case status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
        /> */}
        <br></br>
        <div className="status">
          <FormLabel title="case status" id="demo-error-radios">
            Status
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="status"
            value={value}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="open" control={<Radio />} label="Open" />
            <FormControlLabel
              value="pending"
              control={<Radio />}
              label="Pending"
            />
            <FormControlLabel
              value="closed"
              control={<Radio />}
              label="Closed"
            />
          </RadioGroup>
        </div>
        <div className="court-container">
          <TextField
            label="Judge"
            variant="outlined"
            title="the judge in the case"
            value={judge}
            onChange={(e) => setJudge(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Person3Icon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Court"
            variant="outlined"
            title="The court that is handling the case"
            value={court}
            onChange={(e) => setCourt(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountBalanceIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* <TextField
          label="Parties"
          variant="outlined"
          title="the parties to the case"
          value={parties}
          onChange={(e) => setParties(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="start">
                  <GroupIcon style={{ backgroundColor: "transparent" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
        <div>
          <TextField
            label="Parties"
            variant="outlined"
            title="the parties to the case"
            value={newParty}
            onChange={(e) => setNewParty(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="start">
                    <GroupIcon style={{ backgroundColor: "transparent" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" onClick={addParty}>
            +
          </Button>
          <br></br><br></br>
          {parties.map((party, index) => (
            <TextField
              key={index}
              label={`Party ${index + 1}`}
              variant="outlined"
              value={party}
              disabled
            />
          ))}
          
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <Toaster position="bottom-center" />
      </form>
    </Wrapper>
  );
}
