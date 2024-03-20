import { useEffect, useState } from "react";
import Wrapper from "../assets/stylingWrappers/Search";
import {
  FormControlLabel,
  InputAdornment,
  Menu,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CaseCard from "./CaseCard";
import { fetcher } from "../utils/fetcher";

export default function Search({ cases }) {
  console.log(cases)
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");

  const handleToggleFilter = () => {
    setFilterVisible(!isFilterVisible);
    setSelectedStatus("");
  };

  const handleFilterOptionSelect = (option) => {
    setSelectedOption(option);
    setFilterVisible(true);
  };
  const handleSearChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <Wrapper>
      <div className="browse-container">
        <div className="browse">
          <TextField
            id="outlined-search"
            label="Search"
            type="search"
            onChange={handleSearChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="filter">
          <div className="filter-element">
            <FilterListIcon onClick={handleToggleFilter} />
            <p className="text" onClick={handleToggleFilter}>
              Filter
            </p>
          </div>
          {isFilterVisible && (
            <div className="options-list">
              {/* <p
                className="options"
                onClick={() => handleFilterOptionSelect("caseNumber")}
              >
                Case Number
              </p><hr></hr> */}
              <p
                className="options"
                onClick={() => handleFilterOptionSelect("type")}
              >
                Type
              </p>
              <hr></hr>
              <p
                className="options"
                onClick={() => handleFilterOptionSelect("status")}
              >
                Status
              </p>
              {selectedOption === "status" && (
                <RadioGroup
                  aria-labelledby="status-radio-buttons-group-label"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  name="status-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Open"
                    control={<Radio />}
                    label="Open"
                  />
                  <FormControlLabel
                    value="Pending"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    value="Closed"
                    control={<Radio />}
                    label="Closed"
                  />
                </RadioGroup>
              )}
              <hr></hr>
              {/* <p
                className="options"
                onClick={() => handleFilterOptionSelect("partiesInvolved")}
              >
                Parties Involved
              </p><hr></hr> */}
              <p
                className="options"
                onClick={() => handleFilterOptionSelect("hearingDates")}
              >
                Hearing Dates
              </p>
              <hr></hr>
            </div>
          )}
        </div>

        <p className="text-case">Cases |</p>
        <CaseCard cases={cases} />
        {/* {cases.map((caseItem) => (
          <CaseCard key={caseItem.id} caseItem={caseItem} />
        ))} */}
      </div>
    </Wrapper>
  );
}