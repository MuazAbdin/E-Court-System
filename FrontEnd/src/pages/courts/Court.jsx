import { toast } from 'react-toastify';
import { CourtForm } from '../../components'
import { fetcher } from '../../utils/fetcher';
import { redirect, useLoaderData, useRouteLoaderData } from 'react-router-dom';

function Court() {
  const { userData } = useRouteLoaderData("root");
  const courtData = useLoaderData();
  const isCourtManager = userData.userType === "Court Manager"

  return (
    <CourtForm 
      courtData={courtData} 
      readOnly={!isCourtManager} 
      noSubmit={!isCourtManager}
      buttonText="Edit Court"
    />
  )
}

export default Court

export async function loader({ params }) {
  const { courtId } = params;
  try {
    const response = await fetcher(`/courts/${courtId}`);
    if (!response.ok) throw response;
    const courtData = await response.json();
    return courtData;
  } catch (error) {
    toast.error(error.statusText);
    console.log(error);
    return null;
  }
}


export async function action({ request }) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );
  for (const key in data) {
    if (!data[key]) {
      toast.error(`${key} cannot be empty!`);
      return null;
    }
  }
  try {
    const response = await fetcher("/courts/", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data);
    }

    toast.success("Court Updated Successfully!");
    return redirect("");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
