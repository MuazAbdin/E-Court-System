import { Outlet, redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/UserLayout";
import { Aside, PageHeader } from "../components";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetcher";

function UserLayout() {
  const { userData } = useLoaderData();

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

export async function loader() {
  try {
    const response = await fetcher("/users/user");
    if (response.status === 401) return redirect("/");
    if (!response.ok) throw response;
    const data = await response.json();
    const { idNumber: IDcard, phoneNumber: mobile, ...rest } = data;
    const userData = { IDcard, mobile, ...rest };
    return { userData };
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
