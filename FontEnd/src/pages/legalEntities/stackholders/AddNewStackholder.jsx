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
  console.log(fd)
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );
  // data.stakeholderType = document.getElementById("stakeholder-form-stakeholderType").value;

  console.log(data);
  try {
    const response = await fetcher("/stakeholders/", {
      method: request.method,
      body: JSON.stringify(data),
    });

    console.log(response);
    // for (const key in data) {
    //   if (key !== "stakeholderType" && !data[key]) {
    //     toast.error(`${key} cannot be empty!`);
    //     return null;
    //   }
    // }

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
