import { toast } from "react-toastify";
import StyledEventForm from "../../assets/stylingWrappers/StyledEventForm";
import { redirect } from "react-router-dom";

function AddEvent() {
  return (
    <StyledEventForm
      formID="event-form"
      title="add event"
      method="POST"
      buttonText="submit"
    ></StyledEventForm>
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

  // for (const key in data) {
  //   if (!data[key]) {
  //     toast.error(`${key} cannot be empty!`);
  //     return null;
  //   }
  // }

  try {
    //   const response = await fetcher("/cases/", {
    //     method: request.method,
    //     body: JSON.stringify(data),
    //   });

    //   console.log(response);
    //   if (!response.ok) {
    //     const data = await response.text();
    //     console.log(data);
    //     throw new Error(data);
    //   }

    toast.success("Created Successfully!");
    return redirect("..");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
