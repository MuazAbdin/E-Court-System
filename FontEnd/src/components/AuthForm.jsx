import { Form, useNavigation } from "react-router-dom";
import Input from "./Input";
import { useRef, useState } from "react";
import { IconButton } from "@mui/material";
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
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const insertedPassword = useRef(null);

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
    if (["password", "_password"].includes(field.id)) {
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
      {fields.map((f) => {
        const validator =
          f.id === "passwordConfirm"
            ? (value) =>
                f.validator(insertedPassword.current?.value || "", value)
            : f.validator;

        let severErrorMsg = "";

        return (
          <Input
            key={f.id}
            label={f.label}
            type={handleFieldType(f)}
            id={f.id}
            icon={handleFieldIcon(f)}
            ref={f.id === "password" ? insertedPassword : null}
            autoComplete={f.autoComplete ?? "off"}
            validator={validator}
            required={f.required}
            severErrorMsg={severErrorMsg}
            prevValue={""}
            isSubmitted={false}
          />
        );
      })}
      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : `${buttonText}`}
      </button>
      {children}
    </Form>
  );
}

export default AuthForm;
