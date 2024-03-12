import toast, { Toaster } from "react-hot-toast";
import { redirect } from "react-router-dom";
import { StakeholderForm } from "../../../components";
import { fetcher } from "../../../utils/fetcher";

function AddNewStackholder() {
  return <StakeholderForm />;
}

export default AddNewStackholder;

export async function action({ request }) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );
  console.log(data);

  try {
    const response = await fetcher("/stakeholder/", {
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
    return redirect("");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
