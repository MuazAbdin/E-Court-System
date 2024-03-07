import { FaRightFromBracket } from "react-icons/fa6";

function PageHeader({ name }) {
  function handleLogout() {}

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
