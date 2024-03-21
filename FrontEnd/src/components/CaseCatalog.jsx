import { Link } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/CaseCatalog";
import StyledSearchBar from "../assets/stylingWrappers/SearchBar";
import Table from "./Table";
import dayjs from "dayjs";

function CaseCatalog({ pagesCount, currentPage, cases }) {
  return (
    <Wrapper>
      <h3 className="title">browse cases</h3>
      <StyledSearchBar pagesCount={pagesCount} currentPage={currentPage} />
      <Table
        tableCaption=""
        tableHeader={[
          "",
          "#",
          "Title",
          "Status",
          "Court",
          "Judge",
          "Last Update",
        ]}
      >
        {cases.map((r) => (
          <tr key={r.caseNumber}>
            <td>
              <Link to={`/user/cases/${r._id}`}>{r.caseNumber}</Link>
            </td>
            <td>
              <Link to={`/user/cases/${r._id}`}>{r.title}</Link>
            </td>
            <td>{r.status}</td>
            <td>{`${r.court.name} - ${r.court.city}`}</td>
            <td>{r.judge ? r.judge.firstName + " " + r.judge.lastName : ""}</td>
            <td>{dayjs(r.updatedAt).format("DD MMM YYYY - HH:mm")}</td>
          </tr>
        ))}
      </Table>
    </Wrapper>
  );
}

export default CaseCatalog;
