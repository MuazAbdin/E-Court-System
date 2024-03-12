import { Outlet, useOutletContext } from "react-router-dom";

function Profile() {
  const { userData } = useOutletContext();
  return <Outlet context={{ userData }} />;
}

export default Profile;
