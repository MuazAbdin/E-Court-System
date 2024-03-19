import React from "react";
import StyledSearchBar from "../../assets/stylingWrappers/SearchBar";
import { Table } from "../../components";
import { Link } from "react-router-dom";

const COURT_CASES = [
  {
    number: 451,
    title: "case 1",
    status: "pending",
    judge: "judge 1",
    DLU: "3/16/2024",
  },
  {
    number: 336,
    title: "case 2",
    status: "active",
    judge: "judge 2",
    DLU: "3/10/2024",
  },
];

function MyCases() {
  return (
    <div>
      <StyledSearchBar pagesCount={1} currentPage={1} />
      <Table
        tableCaption=""
        tableHeader={["", "#", "title", "status", "judge", "DLU"]}
      >
        {COURT_CASES.map((r) => (
          <tr key={r.number}>
            <td>
              <Link>{r.number}</Link>
            </td>
            <td>{r.title}</td>
            <td>{r.status}</td>
            <td>{r.judge}</td>
            <td>{r.DLU}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default MyCases;
