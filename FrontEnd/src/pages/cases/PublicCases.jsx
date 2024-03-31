import { Link, useLoaderData } from "react-router-dom";
import StyledSearchBar from "../../assets/stylingWrappers/SearchBar";
import Wrapper from "../../assets/stylingWrappers/Courts";
import { Table } from "../../components";
import { fetcher } from "../../utils/fetcher";
import { toast } from "react-toastify";

function PublicCases() {
  const { pagesCount, currentPage, result } = useLoaderData();
  
  return (
    <Wrapper>
      <h3 className="title">browse cases</h3>
      <StyledSearchBar pagesCount={pagesCount} currentPage={currentPage} />
      <Table
        tableCaption=""
        tableHeader={["", "number", "title", "court", "status"]}
      >
        {result.map((r) => (
          <tr key={r._id}>
            <td>
              <Link to={`/user/cases/${r._id}`}>{r.caseNumber}</Link>
            </td>
            <td><Link to={`/user/cases/${r._id}`}>{r.title}</Link></td>
            <td>{`${r.court.name} - ${r.court.city}`}</td>
            <td>{r.status}</td>
          </tr>
        ))}
      </Table>
    </Wrapper>
  )
}

export default PublicCases;


export async function loader({ request }) {
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

  const serverSearchParams = new URLSearchParams({
    ...searchQuery,
    offset,
    limit,
  });

  try {
    const response = await fetcher(`/cases/public/?${serverSearchParams}`);
    if (!response.ok) throw response;
    const { pagesCount, result } = await response.json();
    return { pagesCount, currentPage: page, result };
  } catch (error) {
    if(error.status === 401) {
      toast.error(error.message);
    }
    return error;
  }
}
