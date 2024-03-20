import { Outlet, useOutletContext } from "react-router-dom";

function Cases() {
  const { userData } = useOutletContext();
  return <Outlet context={{ userData }} />;
}

export default Cases;
