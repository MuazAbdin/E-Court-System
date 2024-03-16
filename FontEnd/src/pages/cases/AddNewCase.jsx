import toast, { Toaster } from "react-hot-toast";
import { redirect, useLoaderData } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import StyledCaseForm from "../../assets/stylingWrappers/StyledCaseForm";

function AddNewCase() {
  const courts = useLoaderData();
  // console.log(courts);
  return (
    <StyledCaseForm
      formID="case-form"
      title="claim form"
      method="POST"
      buttonText="submit"
      courts={courts}
    />
  );
}

export default AddNewCase;

export async function loader({ params, request }) {
  try {
    const response = await fetcher("/courts");
    const data = await response.json();

    return data;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}

export async function action({ request }) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );

  // console.log(data);
  const { court, title, description } = data;
  const claimant = getPartyDetails("claimant", data);
  const respondent = getPartyDetails("respondent", data);
  // console.log(claimant, respondent);

  const reqBody = { court, title, description, parties: [] };
  if (claimant)
    reqBody.parties.push({
      client: { ...claimant },
    });
  if (respondent)
    reqBody.parties.push({
      client: { ...respondent },
    });

  console.log(reqBody);

  // for (const key in data) {
  //   if (!data[key]) {
  //     toast.error(`${key} cannot be empty!`);
  //     return null;
  //   }
  // }

  try {
    // const response = await fetcher("/cases/", {
    //   method: request.method,
    //   body: JSON.stringify(data),
    // });

    // console.log(response);
    // if (!response.ok) {
    //   const data = await response.text();
    //   console.log(data);
    //   throw new Error(data);
    // }

    toast.success("Created Successfully!");
    return redirect("");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}

function getPartyDetails(party, data) {
  const details = {};
  for (const k in data) {
    if (!k.includes(party)) continue;
    details[k.split("_")[1]] = data[k];
  }
  details.phoneNumber = details.mobile;
  const { mobile, ...rest } = details;
  const filledKeys = Object.keys(rest).filter((k) => rest[k].trim().length > 0);
  return filledKeys.length > 0 ? rest : null;
}
