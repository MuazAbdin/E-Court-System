import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SubjectIcon from "@mui/icons-material/Subject";
import GavelIcon from "@mui/icons-material/Gavel";
import GroupsIcon from "@mui/icons-material/Groups";
import BadgeIcon from "@mui/icons-material/Badge";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Person3Icon from "@mui/icons-material/Person3";

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
import { IconButton, InputAdornment } from "@mui/material";

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

export const EDIT_USER_FIELDS = REGISTER_FIELDS.filter(
  (f) => f.id !== "password" && f.id !== "passwordConfirm"
).map((f) => {
  if (f.id === "IDcard") return { ...f, readOnly: true };
  return f;
});

export const CHANGE_PASSWORD_FIELDS = [
  {
    label: "Old Password",
    id: "oldPassword",
    type: "password",
    placeholder: "Old Password",
    // validator: isEmpty,
  },
  {
    label: "New Password",
    id: "password",
    type: "password",
    placeholder: "New Password",
    validator: isPasswordValid,
    help: "6-12 characters. At least one lowercase, one uppercase, one digit, one of #?!@$ %^&*- .",
  },
  {
    label: "Confirm Password",
    id: "passwordConfirm",
    type: "password",
    placeholder: "Confirm Password",
    validator: isPasswordConfirmValid,
  },
];

export const COURT_FIELDS = [
  {
    name: "name",
    type: "text",
    label: "Court Name",
    id: "courtName",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    id: "email",
    type: "email",
    autoComplete: "email",
    icon: <MailIcon />,
    required: true,
    validator: isEmailValid,
  },
  {
    name: "phoneNumber",
    label: "Mobile",
    id: "mobile",
    type: "number",
    icon: <PhoneIcon />,
    required: true,
    validator: isMobileValid,
  },
  {
    name: "city",
    label: "City",
    id: "city",
    type: "text",
    icon: <LocationCityIcon />,
    required: true,
    validator: isAddressValid,
  },
  {
    name: "street",
    label: "Street",
    id: "street",
    type: "text",
    icon: <LocationOnIcon />,
    required: true,
    validator: isAddressValid,
  },
];

export const EVENT_FIELDS = [
  {
    label: "Event Type",
    id: "eventType",
    type: "text",
    required: true,
  },
  {
    label: "Description",
    id: "description",
    type: "text",
    icon: <MailIcon />,
    required: true,
  },
  {
    id: "date",
    type: "date",
    required: true,
  },
];

export const DOCUMENT_FIELDS = [
  {
    label: "Document Title",
    id: "title",
    type: "text",
    required: true,
  },
  {
    label: "Honoring Party",
    id: "honoringParty",
    type: "text",
    icon: <GroupsIcon />,
    required: true,
  },
  {
    label: "Subject",
    id: "subject",
    type: "text",
    icon: <SubjectIcon />,
    required: true,
  },
  {
    label: "Requirement According to the Subject",
    id: "requirement",
    type: "text",
    multiline: true,
    rows: 4,
    icon: <ChecklistRtlIcon />,
    required: true,
  },
  {
    label: "Under which law",
    id: "law",
    type: "text",
    icon: <GavelIcon />,
    required: true,
  },
];

export const PARTY_DETAILS_FIELDS = EDIT_USER_FIELDS.map((f) =>
  f.id === "IDcard" ? { ...f, label: "ID Number", id: "idNumber" } : f
)
  .map((f) => (f.id === "mobile" ? { ...f, id: "phoneNumber" } : f))
  .filter((f) => !["city", "street"].includes(f.id));

export const LEGAL_PARTY_FIELDS = [
  {
    label: "Party Name",
    id: "partyName",
    type: "text",
    required: true,
  },
  {
    label: "Case ID",
    id: "caseId",
    type: "text",
    required: true,
  },
  {
    label: "Lawyer",
    id: "lawyer",
    type: "text",
    required: true,
  },
  {
    label: "Stakeholder",
    id: "stakeholder",
    type: "text",
    required: true,
  },
];

export const STAKEHOLDER_FIELDS = [
  {
    label: "ID Number",
    id: "idNumber",
    type: "text",
    required: true,
  },
  {
    label: "First Name",
    id: "firstName",
    type: "text",
    required: true,
  },
  {
    label: "Last Name",
    id: "lastName",
    type: "text",
    required: true,
    validator: isLastNameValid,
  },
  {
    label: "Email",
    id: "email",
    type: "text",
    icon: <MailIcon />,
    required: true,
    validator: isEmailValid,
  },
  {
    label: "Phone",
    id: "phoneNumber",
    type: "text",
    icon: <PhoneIcon />,
    required: true,
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
