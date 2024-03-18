import { StyledStakeholderForm } from "../../assets/stylingWrappers/StyledAuthForm";
import StyledInputSelect from "../../assets/stylingWrappers/StyledInputSelect";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { STAKEHOLDER_FIELDS } from "../../utils/constants";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

function AddStakeholder() {
  return (
    <StyledStakeholderForm
      formID="stakeholder-form"
      title="add stakeholder"
      method="POST"
      buttonText="submit"
      fields={STAKEHOLDER_FIELDS}
    >
      {[
        <fieldset key="fs-stakeholderType">
          <StyledInputSelect
            id="stakeholder-form-type"
            label="Type"
            menuItems={[
              { id: 1, value: "Witness", icon: <PersonSearchIcon /> },
            ]}
          />
        </fieldset>,
      ]}
    </StyledStakeholderForm>
  );
}

export default AddStakeholder;

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
