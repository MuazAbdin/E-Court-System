import { toast } from "react-toastify";
import { fetcher } from "../../utils/fetcher";
import { Table } from "../../components";
import { Link, useLoaderData } from "react-router-dom";

function BrowseCourts() {
  const courts = useLoaderData();

  return (
    <Table tableCaption="Courts" tableHeader={["", "Name", "Location"]}>
      {courts.map((court) => (
        <tr key={court._id}>
          <td>
            <Link to={`/courts/${court._id}`}>{court.name}</Link>
          </td>
          <td>{`${court.city} - ${court.street}`}</td>
        </tr>
      ))}
    </Table>
  );
}

export default BrowseCourts;

export async function loader() {
  try {
    const response = await fetcher("/courts");
    if (!response.ok) throw response;
    const courts = await response.json();
    return courts;
  } catch (error) {
    toast.error(await error.text());
    return [];
  }
}
