import { Outlet, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/DashboardLayout";
import { Aside, PageHeader } from "../components";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetcher";

function DashboardLayout() {
  const { user } = useLoaderData();

  return (
    <Wrapper>
      <Aside />
      <PageHeader name={`${user.firstName} ${user.lastName}`} />
      <section className="content">
        <Outlet />
      </section>
    </Wrapper>
  );
}

export default DashboardLayout;

export async function loader() {
  try {
    const response = await fetcher("/events/upcoming");
    if (!response.ok) throw response;
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
