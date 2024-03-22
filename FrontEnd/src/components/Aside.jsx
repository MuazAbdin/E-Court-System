import { FaRegCircleUser } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Aside";
import Accordion from "./Accordion";
import { MdGavel } from "react-icons/md";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const PROFILE_SECTIONS = [
  { name: "overview", to: "", userTypes: ["Lawyer", "Judge"] },
  {
    name: "edit details",
    to: "edit-details",
    userTypes: ["Lawyer", "Judge", "Court Manager", "Admin"],
  },
  {
    name: "change password",
    to: "change-password",
    userTypes: ["Lawyer", "Judge", "Court Manager", "Admin"],
  },
];

const CASES_SECTIONS = [
  { name: "my cases", to: "cases", userTypes: ["Lawyer", "Judge"] },
  { name: "claim", to: "cases/claim", userTypes: ["Lawyer"] },
  { name: "respond", to: "cases/respond", userTypes: ["Lawyer"] },
  {
    name: "browse cases",
    to: "cases/browse",
    userTypes: ["Court Manager", "Admin"],
  },
  {
    name: "pending claims",
    to: "cases/pending",
    userTypes: ["Court Manager", "Admin"],
  },
  {
    name: "respondents",
    to: "cases/respond-requests",
    userTypes: ["Court Manager", "Admin"],
  },
];

function Aside({ userType }) {
  return (
    <Wrapper>
      <nav>
        <Accordion>
          <Accordion.Item
            id="nav-profile"
            title="profile"
            Icon={FaRegCircleUser}
            subsectoins={PROFILE_SECTIONS.filter((s) =>
              s.userTypes.includes(userType)
            )}
          />
          <Accordion.Item
            id="nav-cases"
            title="cases"
            Icon={MdGavel}
            subsectoins={CASES_SECTIONS.filter((s) =>
              s.userTypes.includes(userType)
            )}
          />
          {["Court Manager", "Admin"].includes(userType) && (
            <Accordion.Item
              id="nav-court"
              title="court"
              Icon={AccountBalanceIcon}
              subsectoins={[
                { name: "browse", to: "/courts" },
                { name: "add new", to: "/courts/add-new" },
              ]}
            />
          )}
        </Accordion>
      </nav>
    </Wrapper>
  );
}

export default Aside;
