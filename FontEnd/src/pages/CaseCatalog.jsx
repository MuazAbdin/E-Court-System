import { useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/CaseCatalog";
import StyledSearchBar from "../assets/stylingWrappers/SearchBar";
import { Table } from "../components";

function CaseCatalog() {
  const { pagesCount, currentPage, result } = useLoaderData();
  return (
    <Wrapper>
      <h3 className="title">browse cases</h3>
      <StyledSearchBar pagesCount={pagesCount} currentPage={currentPage} />
      <Table tableCaption="" tableHeader={["", "number", "title", "status"]}>
        {result.map((r) => (
          <tr key={r.number}>
            <td>{r.number}</td>
            <td>{r.title}</td>
            <td>{r.status}</td>
          </tr>
        ))}
      </Table>
    </Wrapper>
  );
}

export default CaseCatalog;

export async function loader({ params, request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const location = url.searchParams.getAll("location") || [];
  const status = url.searchParams.getAll("status") || [];
  const page = parseInt(url.searchParams.get("page") || "1");
  const start = url.searchParams.get("start") || "";
  const end = url.searchParams.get("end") || "";
  const limit = 10;
  const offset = (page - 1) * limit;
  // console.log({ query, location, status, page, offset, limit });

  const serverSearchParams = new URLSearchParams({
    query,
    location,
    status,
    start,
    end,
    offset,
    limit,
  });
  console.log(serverSearchParams.toString());
  const data = {
    pagesCount: 7,
    currentPage: page,
    result: [
      { number: "1234", title: "Bankruptcy Proceedings", status: "Active" },
      { number: "5601", title: "Medical Malpractice", status: "Dismissed" },
      { number: "9074", title: "Contract Dispute", status: "Settled" },
    ],
  };
  return data;
}
