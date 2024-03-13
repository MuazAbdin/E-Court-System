import Wrapper from "../assets/stylingWrappers/Guest";
import StyledSearchBar from "../assets/stylingWrappers/SearchBar";

function Guest() {
  return (
    <Wrapper>
      <h3 className="title">browse cases</h3>
      <StyledSearchBar />
    </Wrapper>
  );
}

export default Guest;

export async function loader({ params, request }) {}

export async function action({ params, request }) {}
