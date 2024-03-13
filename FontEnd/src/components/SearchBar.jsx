import { FaMagnifyingGlass } from "react-icons/fa6";
import { Form } from "react-router-dom";

function SearchBar({ className }) {
  return (
    <Form className={className} noValidate>
      <fieldset className="text-search">
        <input type="text" id="search" name="search" placeholder="Search" />
        <button className="btn">
          <FaMagnifyingGlass />
        </button>
      </fieldset>
      <fieldset className="filters">
        <span>filter by: </span>
        <input type="checkbox" id="type" name="type" value="Type" />
        <label htmlFor="type"> Type</label>
        <input type="checkbox" id="status" name="status" value="Status" />
        <label htmlFor="status"> Status</label>
        <input
          type="checkbox"
          id="hearing-date"
          name="hearing-date"
          value="Hearing Date"
        />
        <label htmlFor="hearing-date"> Hearing Date</label>
      </fieldset>
    </Form>
  );
}

export default SearchBar;
