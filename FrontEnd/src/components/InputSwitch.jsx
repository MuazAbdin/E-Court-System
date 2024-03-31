import { useState } from "react";
import Wrapper from "../assets/stylingWrappers/InputSwitch";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

function InputSwitch({ formID, initialValue }) {
  const [checked, setChecked] = useState(initialValue);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Wrapper color={checked ? "#5098e0" : "var(--text-color)"}>
      <input
        type="checkbox"
        id={`${formID}-public`}
        name={`${formID}-public`}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={`${formID}-public`}>Public</label>
      {checked ? (
        <BsToggleOn onClick={handleChange} />
      ) : (
        <BsToggleOff onClick={handleChange} />
      )}
    </Wrapper>
  );
}

export default InputSwitch;
