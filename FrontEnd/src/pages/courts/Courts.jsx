import { Outlet, useOutletContext } from "react-router-dom";

function Courts() {
  const { userData } = useOutletContext();
  return <Outlet context={{ userData }} />;
}

export default Courts;
