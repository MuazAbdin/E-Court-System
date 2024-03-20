import { toast } from "react-toastify";
import StyledEventForm from "../../assets/stylingWrappers/StyledEventForm";
import { redirect, useNavigate } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";
import { fetcher } from "../../utils/fetcher";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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

  const reqData = {
    caseId: caseID,
    eventType: data.type,
    date: dayjs.utc(data.date, "DD MMM YYYY - HH:mm"),
    description: data.description,
    location: "Jerusalem", // for now
  };

  // for (const key in data) {
  //   if (!data[key]) {
  //     toast.error(`${key} cannot be empty!`);
  //     return null;
  //   }
  // }

  try {
    const response = await fetcher(`/events`, {
      method: request.method,
      body: JSON.stringify(reqData),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data);
    }

    toast.success("Created Successfully!");
    return redirect("..");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
