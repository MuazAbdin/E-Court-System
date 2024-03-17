import { useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/CaseCatalog";
import StyledSearchBar from "../assets/stylingWrappers/SearchBar";
import { Table } from "../components";
import { fetcher } from "../utils/fetcher";

function CaseCatalog() {
  const { pagesCount, currentPage, result } = useLoaderData();
  return (
    <Wrapper>
      <h3 className="title">browse cases</h3>
      <StyledSearchBar pagesCount={pagesCount} currentPage={currentPage} />
      <Table
        tableCaption=""
        tableHeader={["", "number", "court", "title", "status"]}
      >
        {result.map((r) => (
          <tr key={r.number}>
            <td>{r.number}</td>
            <td>{r.court}</td>
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
  const searchQuery = {};
  const query = url.searchParams.get("query") || "";
  if (query.trim() !== "") searchQuery.query = query;
  const location = url.searchParams.getAll("location");
  if (location.length > 0 && location[0] !== "")
    searchQuery.location = location;
  const status = url.searchParams.getAll("status");
  if (status.length > 0 && status[0] !== "") searchQuery.status = status;
  const page = parseInt(url.searchParams.get("page") || "1");
  const start = url.searchParams.get("start") || "";
  if (start.trim() !== "") searchQuery.start = start;
  const end = url.searchParams.get("end") || "";
  if (end.trim() !== "") searchQuery.end = end;
  const limit = 10;
  const offset = (page - 1) * limit;
  // console.log({ query, location, status, page, offset, limit });

  const serverSearchParams = new URLSearchParams({
    ...searchQuery,
    offset,
    limit,
  });
  // console.log(serverSearchParams.toString());
  // console.log(`/cases/?${serverSearchParams}`);

  try {
    const response = await fetcher(`/cases/?${serverSearchParams}`);
    const cases = await response.json();
    console.log(cases);
    // console.log({ pagesCount, result });
  } catch (error) {}
  const data = {
    pagesCount: 7,
    currentPage: page,
    result: [
      {
        number: "1234",
        court: "District - Jerusalem",
        title: "Bankruptcy Proceedings",
        status: "Active",
      },
      {
        number: "5601",
        court: "Supreme - Jerusalem",
        title: "Medical Malpractice",
        status: "Dismissed",
      },
      {
        number: "9074",
        court: "District - Haifa",
        title: "Contract Dispute",
        status: "Settled",
      },
    ],
  };
  return data;
}
