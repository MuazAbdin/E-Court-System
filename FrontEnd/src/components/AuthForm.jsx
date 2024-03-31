import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "./Input";
import { useRef, useState } from "react";
import { IconButton, useThemeProps } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function AuthForm({
  children,
  className,
  formID,
  title,
  method,
  buttonText,
  fields,
  values,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const insertedPassword = useRef(null);

  const actionData = useActionData();
  // const invalidCredentials = actionData?.msg === "invalid credentials";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleFieldType = (field) => {
    if (
      (field.id === "password" && showPassword) ||
      (field.id === "passwordConfirm" && showConfirmPassword)
    ) {
      return "text";
    }
    return field.type;
  };

  const handleFieldIcon = (field) => {
    if (field.id === "password") {
      return (
        <IconButton
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      );
    }
    if (field.id === "passwordConfirm") {
      return (
        <IconButton
          className="eye-icon"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      );
    }
    return field.icon;
  };

  return (
    <Form method={method} id={formID} className={className} noValidate>
      <h3 className="title">{title}</h3>
      {children?.filter((c) => c.type === "fieldset")}
      {fields.map((f) => {
        const validator =
          f.id === "passwordConfirm"
            ? (value) =>
                f.validator(insertedPassword.current?.value || "", value)
            : f.validator;

        let severErrorMsg = "";
        if (actionData && actionData.data) {
          const inputItem = actionData.data.find((item) => item.name === f.id);
          if (inputItem) severErrorMsg = inputItem.message;
        }

        return (
          <Input
            key={`${formID}-${f.id}`}
            label={f.label}
            type={handleFieldType(f)}
            id={`${formID}-${f.id}`}
            icon={handleFieldIcon(f)}
            readOnly={f.readOnly}
            ref={f.id === "password" ? insertedPassword : null}
            autoComplete={f.autoComplete ?? "off"}
            validator={validator}
            required={f.required}
            disabled={f.disabled}
            severErrorMsg={severErrorMsg}
            multiline={f.multiline ?? false}
            rows={f.rows ?? undefined}
            prevValue={values?.[f.id] || ""}
            isSubmitted={actionData?.msg === "Invalid inputs"}
          />
        );
      })}
      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : `${buttonText}`}
      </button>
      {children?.filter((c) => c.type !== "fieldset")}
    </Form>
  );
}

export default AuthForm;
