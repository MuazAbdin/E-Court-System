import { FaRegCircleUser } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Aside";
import Accordion from "./Accordion";
import { MdGavel } from "react-icons/md";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BalanceIcon from "@mui/icons-material/Balance";

const PROFILE_SECTIONS = [
  { name: "overview", to: "" },
  { name: "edit details", to: "edit-details" },
  { name: "change password", to: "change-password" },
];

function Aside() {
  return (
    <Wrapper>
      <nav>
        <Accordion>
          <Accordion.Item
            id="nav-profile"
            title="profile"
            Icon={FaRegCircleUser}
            subsectoins={PROFILE_SECTIONS}
          />
          <Accordion.Item
            id="nav-cases"
            title="cases"
            Icon={MdGavel}
            subsectoins={[
              { name: "my cases", to: "cases" },
              { name: "claim", to: "cases/claim" },
              { name: "respond", to: "cases/respond" },
            ]}
          />
          <Accordion.Item
            id="nav-court"
            title="court"
            Icon={AccountBalanceIcon}
            subsectoins={[
              // { name: "browse", to: "courts" },
              { name: "add new", to: "courts/add-new" },
            ]}
          />
        </Accordion>
      </nav>
    </Wrapper>
  );
}

export default Aside;
