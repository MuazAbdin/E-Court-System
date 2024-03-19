import { toast } from "react-toastify";
import StyledEventForm from "../../assets/stylingWrappers/StyledEventForm";
import { redirect, useNavigate } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";
import { fetcher } from "../../utils/fetcher";

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

export async function action({ request }) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );

  console.log(data);

  try {
    // Create event
    const responseCreate = await fetcher("/events", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!responseCreate.ok) {
      throw new Error("Failed to create event"); 
    }

    const eventData = await responseCreate.json();

    // Get upcoming events
    const responseUpcoming = await fetcher("/events/upcoming");
    const upcomingEventData = await responseUpcoming.json();

    // Get events by case ID 
    const responseByCaseId = await fetcher(`/events/case/${data.caseId}`);
    const byCaseIdData = await responseByCaseId.json();

    // Get event by ID 
    const responseById = await fetcher(`/events/${data.eventId}`);
    const byIdData = await responseById.json();

    // Update event 
    const responseUpdate = await fetcher(`/events`, { 
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ eventId: data.eventId, newData: "updatedData" })
    });

    // Delete event 
    const responseDelete = await fetcher(`/events`, { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ eventId: data.eventId })
    });

    toast.success("Action completed successfully!");
    return redirect("..");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
