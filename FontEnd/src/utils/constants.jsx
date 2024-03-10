import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  isAddressValid,
  isEmailValid,
  isFirstNameValid,
  isIDValid,
  isLastNameValid,
  isMobileValid,
  isPasswordConfirmValid,
  isPasswordValid,
} from "./validation";

export const REGISTER_FIELDS = [
  {
    type: "number",
    label: "ID Card",
    id: "IDcard",
    required: true,
    validator: isIDValid,
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    required: true,
    validator: isPasswordValid,
  },
  {
    label: "Confirm Password",
    id: "passwordConfirm",
    type: "password",
    required: true,
    validator: isPasswordConfirmValid,
  },
  {
    label: "First Name",
    id: "firstName",
    type: "text",
    autoComplete: "given-name",
    required: true,
    validator: isFirstNameValid,
  },
  {
    label: "Last Name",
    id: "lastName",
    type: "text",
    autoComplete: "family-name",
    required: true,
    validator: isLastNameValid,
  },
  {
    label: "Email",
    id: "email",
    type: "email",
    autoComplete: "email",
    icon: <MailIcon />,
    required: true,
    validator: isEmailValid,
  },
  {
    label: "Mobile",
    id: "mobile",
    type: "number",
    icon: <PhoneIcon />,
    required: true,
    validator: isMobileValid,
  },
  {
    label: "City",
    id: "city",
    type: "text",
    icon: <LocationCityIcon />,
    required: true,
    validator: isAddressValid,
  },
  {
    label: "Street",
    id: "street",
    type: "text",
    icon: <LocationOnIcon />,
    required: true,
    validator: isAddressValid,
  },
];

export const LOGIN_FIELDS = [
  {
    type: "number",
    label: "ID Card",
    id: "IDcard",
    required: true,
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    required: true,
  },
];
