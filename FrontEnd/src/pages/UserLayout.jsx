import { Outlet, useRouteLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/UserLayout";
import { Aside, PageHeader } from "../components";

function UserLayout() {
  const { userData } = useRouteLoaderData("root");
  return (
    <Wrapper>
      <Aside userType={userData.userType} />
      <PageHeader name={`${userData.firstName} ${userData.lastName}`} />
      <section className="content">
        <Outlet context={{ userData }} />
      </section>
    </Wrapper>
  );
}

export default UserLayout;
