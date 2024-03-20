import { FaRightFromBracket } from "react-icons/fa6";
import { fetcher } from "../utils/fetcher";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PageHeader({ name }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await fetcher("/auth/logout", { method: "POST" });
    toast.success("Logged out successfully");
    return navigate("/auth/login");
  }

  return (
    <header>
      <div className="welcome-msg">
        Hello, <strong>{name}</strong>
      </div>
      <button className="btn logout-btn" onClick={handleLogout}>
        <FaRightFromBracket />
        <span>Logout</span>
      </button>
    </header>
  );
}

export default PageHeader;
