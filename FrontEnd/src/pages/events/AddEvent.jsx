import { toast } from "react-toastify";
import StyledEventForm from "../../assets/stylingWrappers/StyledEventForm";
import { redirect, useNavigate } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";

function AddEvent() {
  const navigate = useNavigate();

  return (
    <>
      <div className="back-btn c-flex" onClick={() => navigate("..")}>
        <FaAnglesLeft /> view case
      </div>
      <StyledEventForm
        formID="event-form"
        title="add event"
        method="POST"
        buttonText="submit"
      ></StyledEventForm>
    </>
  );
}

export default AddEvent;

export async function action({ params, request }) {
  const { caseID } = params;
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );

  console.log(data);
  console.log(caseID);

  // for (const key in data) {
  //   if (!data[key]) {
  //     toast.error(`${key} cannot be empty!`);
  //     return null;
  //   }
  // }

  try {
    const response = await fetcher("/events/case/:id", {
      method: request.method,
      body: JSON.stringify(data),
    });

    console.log(response);
    if (!response.ok) {
      const data = await response.text();
      console.log(data);
      throw new Error(data);
    }

    toast.success("Created Successfully!");
    return redirect("..");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
