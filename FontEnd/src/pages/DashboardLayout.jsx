import { Outlet, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/DashboardLayout";
import { Aside, PageHeader } from "../components";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetcher";

function DashboardLayout() {
  const { userData } = useLoaderData();
  // console.log(userData);

  return (
    <Wrapper>
      <Aside />
      <PageHeader name={`${userData.firstName} ${userData.lastName}`} />
      <section className="content">
        <Outlet context={{ userData }} />
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
    const { idNumber: IDcard, phoneNumber: mobile, ...rest } = data.user;
    const userData = { IDcard, mobile, ...rest };
    // console.log(userData);
    return { userData };
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
