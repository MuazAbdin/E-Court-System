import { Outlet, useOutletContext } from "react-router-dom";

function Parties() {
  const { userData } = useOutletContext();
  return <Outlet context={{ userData }} />;
}

export default Parties;
