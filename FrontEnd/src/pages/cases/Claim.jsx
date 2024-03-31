import {
  redirect,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import StyledCaseForm from "../../assets/stylingWrappers/StyledCaseForm";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Claim() {
  const courts = useLoaderData();
  const navigate = useNavigate();
  const { userData } = useRouteLoaderData("root");

  useEffect(() => {
    if (!userData || userData.userType !== "Lawyer") {
      navigate("/auth/login");
    }
  }, [userData]);

  return (
    <StyledCaseForm
      formID="claim-form"
      title="claim form"
      method="POST"
      buttonText="submit"
      values={{ userData }}
      isEdit={false}
      courts={courts}
    />
  );
}

export default Claim;

export async function loader({ params, request }) {
  try {
    const response = await fetcher("/courts");
    if (!response.ok) return [];
    const data = await response.json();

    return data;
  } catch (error) {
    // toast.error(error.message);
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

  const {
    court,
    title,
    description,
    ClaimantLawyerNotes: claimantLawyerNotes,
    RespondentLawyerNotes: respondentLawyerNotes,
    JudgeNotes: judgeNotes,
  } = data;

  const claimant = getPartyDetails("claimant_", data);
  const respondent = getPartyDetails("respondent_", data);

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

function getPartyDetails(party, data) {
  const details = {};
  for (const k in data) {
    if (!k.includes(party)) continue;
    details[k.split("_")[1]] = data[k];
  }
  const { mobile, ...rest } = details;
  const filledKeys = Object.keys(rest).filter((k) => rest[k].trim().length > 0);
  return filledKeys.length > 0 ? rest : null;
}
