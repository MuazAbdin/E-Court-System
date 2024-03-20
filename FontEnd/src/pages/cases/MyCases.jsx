import StyledSearchBar from "../../assets/stylingWrappers/SearchBar";
import { Table } from "../../components";
import { Link, useLoaderData } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import { toast } from "react-toastify";

function MyCases() {
  const casesData = useLoaderData();

  return (
    <div>
      <StyledSearchBar pagesCount={casesData.pagesCount} currentPage={1} />
      <Table
        tableCaption=""
        tableHeader={["", "#", "Title", "Status", "Judge", "Last Update"]}
      >
        {casesData.result.map((r) => (
          <tr key={r.number}>
            <td>
              <Link>{r.number}</Link>
            </td>
            <td>{r.title}</td>
            <td>{r.status}</td>
            <td>{r.judge ? r.judge.firstName + " " + r.judge.lastName : ""}</td>
            <td>{r.updatedAt}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default MyCases;


export async function loader() {
  try {
    const response = await fetcher("/cases/user/");
    if(!response.ok) throw response;
    const cases = await response.json();
    return cases;
  }
  catch(error) {
    toast.error(error.statusText);
    console.log(error);
    return [];
  }
}