import toast, { Toaster } from "react-hot-toast";
import { redirect } from "react-router-dom";
import { PartyForm } from "../../../components";
import { fetcher } from "../../../utils/fetcher";

function AddNewParty() {
  return <PartyForm />;
}

export default AddNewParty;

export async function action({ request }) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );
  console.log(data);
  for (const key in data) {
    if (!data[key]) {
      toast.error(`${key} cannot be empty!`);
      return null;
    }
  }
  try {
    const response = await fetcher("/party/", {
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
