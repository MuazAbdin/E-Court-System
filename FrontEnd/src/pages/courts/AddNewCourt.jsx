import { redirect } from "react-router-dom";
import { CourtForm } from "../../components";
import { fetcher } from "../../utils/fetcher";
import { toast } from "react-toastify";

function AddNewCourt() {
  return <CourtForm />;
}

export default AddNewCourt;

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
      method: request.method,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data);
    }

    toast.success("Created Successfully!");
    return redirect("");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
