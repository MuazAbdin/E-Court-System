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

export const COURT_FIELDS = [
  {
    type: "text",
    label: "Court Name",
    id: "courtName",
    required: true,
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

export const EVENT_FIELDS = [
  {
    label: "Event Type",
    id: "eventType",
    type: "text",
  },
  {
    label: "Description",
    id: "email",
    type: "text",
    autoComplete: "email",
    icon: <MailIcon />,
  },
  {
    id: "email",
    type: "date",
  },
];

export const DOCUMENT_FIELDS = [
  {
    label: "Document Title",
    id: "documentTitle",
    type: "text",
  },
  {
    label: "Honoring Party",
    id: "honoringParty",
    type: "text",
    icon: <GroupsIcon />,
  },
  {
    label: "Subject",
    id: "subject",
    type: "text",
    icon: <SubjectIcon />,
  },
  {
    label: "Requirement According to the Subject",
    id: "requirement",
    type: "text",
    multiline: true,
    rows: 4,
    icon: <ChecklistRtlIcon />,
  },
  {
    label: "Under which law",
    id: "onWhichDocument",
    type: "text",
    icon: <GavelIcon />,
  },
  {
    label: "Select Case",
    id: "caseNum",
    type: "select",
  },
  {
    // label: "Date",
    id: "date",
    type: "date",
    variant: "standard",
  },
  {
    // label: "Attach Document",
    id: "attachDocument",
    type: "file",
    icon: <AttachFileIcon />,
  },
];
export const LEGAL_PARTY_FIELDS = [
  {
    label: "Party Name",
    id: "partyName",
    type: "text",
  },
  {
    label: "Case ID",
    id: "caseId",
    type: "text",
  },
  {
    label: "Lawyer",
    id: "lawyer",
    type: "text",
  },
  {
    label: "Stakeholder",
    id: "stakeholder",
    type: "text",
  },
];

export const STAKEHOLDER_FIELDS = [
  {
    label: "ID Number",
    id: "idNumber",
    type: "text",
    title: "id number",
  },
  {
    label: "First Name",
    id: "firstName",
    type: "text",
    title: "first name",
  },
  {
    label: "Last Name",
    id: "lastName",
    type: "text",
    title: "last name",
  },
  {
    label: "Email",
    id: "email",
    type: "text",
    title: "email address",
    icon: <MailIcon />,
  },
  {
    label: "Phone",
    id: "phone",
    type: "text",
    title: "phone number",
    icon: <PhoneIcon />,
  },
  {
    label: "City",
    id: "city",
    type: "text",
    title: "city",
    icon: <LocationCityIcon />,
  },
  {
    label: "Street Address",
    id: "streetAddress",
    type: "text",
    title: "street address",
    icon: <LocationOnIcon />,
  },
];
export const CASE_FIELDS = [
  {
    label: "Case Title",
    id: "caseTitle",
    type: "text",
    variant: "outlined",
    title: "case title",
  },
  {
    label: "Description",
    id: "description",
    type: "text",
    variant: "outlined",
    title: "case description",
    multiline: true,
    rows: 4,
    icon: <EditNoteIcon />,
  },
  {
    label: "Status",
    id: "status",
    variant: "standard",
    title: "case status",
  },
  {
    label: "Judge",
    id: "judge",
    type: "text",
    variant: "outlined",
    title: "the judge in the case",
   icon: <Person3Icon />
  },
  {
    label: "Court",
    id: "court",
    type: "text",
    variant: "outlined",
    title: "The court that is handling the case",
    icon: <AccountBalanceIcon />,
  },
  {
    label: "Parties",
    id: "newParty",
    type: "text",
    variant: "outlined",
    title: "the parties to the case",
    icon: <GroupIcon style={{ backgroundColor: "transparent" }} />
  },
];
