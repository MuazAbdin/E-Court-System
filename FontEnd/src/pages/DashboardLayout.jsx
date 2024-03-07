import { Outlet } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/DashboardLayout";
import { Aside, PageHeader } from "../components";

function DashboardLayout() {
  return (
    <Wrapper>
      <Aside />
      <PageHeader name="Muaz Abdin" />
      <section className="content">
        <Outlet />
      </section>
    </Wrapper>
  );
}

export default DashboardLayout;
