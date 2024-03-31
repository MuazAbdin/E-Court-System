import { fetcher } from "../../utils/fetcher";
import { toast } from "react-toastify";
import { StyledResponseForm } from "../../assets/stylingWrappers/StyledAuthForm";
import { redirect, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useEffect } from "react";

function Respond() {
  const navigate = useNavigate();
  const { userData } = useRouteLoaderData("root");

  useEffect(() => {
    if (!userData || userData.userType !== "Lawyer") {
      navigate("/auth/login");
    }
  }, [userData]);

  return (
    <StyledResponseForm
      formID="response-form"
      title="respond to claim"
      method="POST"
      buttonText="request"
      fields={[
        {
          label: "Case Number",
          id: "caseNumber",
          type: "text",
          required: true,
        },
      ]}
    ></StyledResponseForm>
  );
}

export default Respond;

export async function action({ params, request }) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );

  try {
    const response = await fetcher("/case-responds", {
      method: request.method,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data);
    }

    toast.success("request submitted successfully");
    return redirect("..");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
