import {
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useState } from "react";

function InputSelect({ className, id, label, menuItems }) {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl size="small" variant="filled" className={className}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={id}
        value={age}
        label={label}
        onChange={handleChange}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default InputSelect;
