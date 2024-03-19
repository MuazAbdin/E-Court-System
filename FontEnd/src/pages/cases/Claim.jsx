import { redirect, useLoaderData } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import StyledCaseForm from "../../assets/stylingWrappers/StyledCaseForm";
import { toast } from "react-toastify";

function Claim() {
  const courts = useLoaderData();
  // console.log(courts);
  return (
    <StyledCaseForm
      formID="claim-form"
      title="claim form"
      method="POST"
      buttonText="submit"
      values={[]}
      isEdit={false}
      courts={courts}
    />
  );
}

export default Claim;

export async function loader({ params, request }) {
  try {
    const response = await fetcher("/courts");
    if(!response.ok) return [];
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
  const {
    court,
    title,
    description,
    ClaimantLawyerNotes: claimantLawyerNotes,
    RespondentLawyerNotes: respondentLawyerNotes,
    JudgeNotes: judgeNotes,
  } = data;
  console.log(data);
  // return null;
  const claimant = getPartyDetails("claimant_", data);
  const respondent = getPartyDetails("respondent_", data);
  // console.log(claimant, respondent);

  const reqBody = {
    court,
    title,
    description,
    claimantLawyerNotes,
    respondentLawyerNotes,
    judgeNotes,
    parties: [],
  };

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
    const response = await fetcher("/cases/file-a-case", {
      method: request.method,
      body: JSON.stringify(reqBody),
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

function getPartyDetails(party, data) {
  const details = {};
  for (const k in data) {
    if (!k.includes(party)) continue;
    details[k.split("_")[1]] = data[k];
  }
  // details.phoneNumber = details.mobile;
  const { mobile, ...rest } = details;
  const filledKeys = Object.keys(rest).filter((k) => rest[k].trim().length > 0);
  return filledKeys.length > 0 ? rest : null;
}
