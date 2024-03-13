import { useLoaderData, useParams } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import ViewCase from "../ViewCase";
import { toast } from "react-toastify";

function CaseDetails() {
  const { caseID } = useParams();
  const caseData = useLoaderData(caseID);

  return <ViewCase case={caseData} />;
}

export default CaseDetails;

export async function loader({ params }) {
  try {
    console.log(params)
    const { caseID } = params;
    console.log(params)
    const response = await fetcher(`/cases/${caseID}`);
    if (!response.ok) throw response;
    const caseData = await response.json();
    return { caseData };
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
