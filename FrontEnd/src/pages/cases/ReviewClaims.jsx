import { toast } from "react-toastify";
import { fetcher } from "../../utils/fetcher";
import { Link, useLoaderData } from "react-router-dom";
import { Table } from "../../components";
import StyledSearchBar from "../../assets/stylingWrappers/SearchBar";
import dayjs from "dayjs";

function ReviewClaims() {
  const { pagesCount, currentPage, cases } = useLoaderData();

  return (
    <div>
      <StyledSearchBar pagesCount={pagesCount} currentPage={currentPage} />
      <Table
        tableCaption=""
        tableHeader={["", "#", "Title", "Court", "Lawyer", "Client", "Created"]}
      >
        {cases.map((r) => (
          <tr key={r.caseNumber}>
              <td>
                <Link to={`/user/cases/${r._id}`}>{r.caseNumber}</Link>
              </td>
              <td>
                <Link to={`/user/cases/${r._id}`}>{r.title}</Link>
              </td>
              <td>{r.court.name}</td>
              <td>{r.parties[0].lawyer.firstName + " " + r.parties[0].lawyer.lastName}</td>
              <td>{r.parties[0].client.firstName }</td>
              <td>{dayjs(r.updatedAt).format("DD MMM YYYY")}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default ReviewClaims

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
    const response = await fetcher(`/cases/pending/?${serverSearchParams}`);
    if(!response.ok) throw response;
    const cases = await response.json();
    return { pagesCount: cases.pagesCount, currentPage: page, cases: cases.result };
  }
  catch(error) {
    if(error.status === 401) {
      toast.error(error.statusText);
    }
    console.log(error);
    return [];
  }
} 