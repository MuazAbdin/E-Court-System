import { forwardRef } from "react";
import { useInput } from "../hooks/useInput";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Wrapper from "../assets/stylingWrappers/Input";

const setInputProps = (icon) => {
  if (!icon) return;
  return {
    endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
  };
};

const Input = forwardRef(function Input(
  {
    label,
    id,
    icon,
    readOnly,
    validator,
    severErrorMsg,
    prevValue,
    isSubmitted,
    ...props
  },
  ref
) {
  const {
    value,
    hasError,
    errorMessage,
    showMessage,
    handleInputChange,
    handleInputBlur,
  } = useInput(validator, severErrorMsg, isSubmitted, prevValue);

  return (
    <Wrapper>
      <TextField
        label={label}
        id={id}
        name={id}
        fullWidth
        variant="filled"
        size="small"
        InputProps={{ ...setInputProps(icon), readOnly }}
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={showMessage && hasError}
        helperText={showMessage && hasError ? errorMessage : ""}
        {...props}
        inputRef={ref}
        // color="success"
      />
    </Wrapper>
  );
});

export default Input;

function InputHelp({ message }) {
  const instructions = message.split(".").slice(0, -1);
  if (instructions.length === 1)
    return <div className="input-help-msg">{message}</div>;
  return (
    <menu className="input-help-msg">
      {instructions.map((msg) => (
        <li key={msg}>{msg}</li>
      ))}
    </menu>
  );
}
