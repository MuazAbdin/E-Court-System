import { Form, useActionData, useNavigation } from "react-router-dom";
import InputFileUpload from "../InputFileUpload";
import Input from "../Input";
// import MultipleFileUploader from "../InputFileUpload";

export default function DocumentForm({
  children,
  className,
  formID,
  title,
  method,
  buttonText,
  fields,
  values,
}) {
  const actionData = useActionData();
  // const invalidCredentials = actionData?.msg === "invalid credentials";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method={method}
      id={formID}
      className={className}
      noValidate
      encType="multipart/form-data"
    >
      <h3 className="title">{title}</h3>

      {fields.map((f) => {
        let severErrorMsg = "";
        if (actionData && actionData.data) {
          const inputItem = actionData.data.find((item) => item.name === f.id);
          if (inputItem) severErrorMsg = inputItem.message;
        }

        return (
          <Input
            key={`${formID}-${f.id}`}
            label={f.label}
            type={f.type}
            id={`${formID}-${f.id}`}
            icon={f.icon}
            readOnly={f.readOnly}
            validator={f.validator}
            required={f.required}
            disabled={f.disabled}
            severErrorMsg={severErrorMsg}
            prevValue={values?.[f.id] || ""}
            isSubmitted={actionData?.msg === "Invalid inputs"}
          />
        );
      })}

      <InputFileUpload />

      {children}

      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : `${buttonText}`}
      </button>
    </Form>
  );
}
