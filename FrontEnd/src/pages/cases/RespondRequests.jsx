import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Table } from "../../components";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { fetcher } from "../../utils/fetcher";

function RespondRequests() {
  const navigate = useNavigate();

  const handleResponse = async (approve, caseRespondId) => {
    try {
      await fetcher(`/case-responds/review`, {
        method: "PATCH",
        body: JSON.stringify({ approve, caseRespondId }),
      });
      return navigate("");
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  };

  const data = useLoaderData();

  return (
    <Table
      tableCaption="respondesnts"
      tableHeader={["", "#", "Title", "Lawyer", "", ""]}
    >
      {data.map((r) => (
        <tr key={r._id}>
          <td>
            <Link to={`/user/cases/${r.case._id}`}>{r.case.caseNumber}</Link>
          </td>
          <td>
            <Link to={`/user/cases/${r.case._id}`}>{r.case.title}</Link>
          </td>
          <td>{`${r.lawyer.firstName} ${r.lawyer.lastName}`}</td>
          <td className="accept" onClick={() => handleResponse(true, r._id)}>
            <FaCircleCheck />
          </td>
          <td className="reject" onClick={() => handleResponse(false, r._id)}>
            <FaCircleXmark />
          </td>
        </tr>
      ))}
    </Table>
  );
}

export default RespondRequests;

export async function loader({ params, request }) {
  try {
    const response = await fetcher("/case-responds");
    if (!response.ok) throw new Error(response.statusText);
    const data = response.json();
    return data;
  } catch (error) {
    if(error.status === 401) {
      toast.error(error.message);
    }
    return [];
  }
}
