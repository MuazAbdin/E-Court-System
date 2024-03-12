import styled from "styled-components";
import { SearchBar } from "../../components";

const StyledSearchBar = styled(SearchBar)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1.2;
  border-bottom: 1px dashed;

  fieldset {
    width: 100%;
    max-width: min(100%, 30rem);
    border: none;
    height: 2rem;

    input {
      height: 2.5rem;
      border: none;
      border-radius: 50px;
      padding: 0.75rem;
      font-family: var(--main-font);
      font-size: 1rem;
    }

    input[type="text"] {
      width: 100%;
    }
  }

  .filters {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.15rem;

    span {
      text-transform: capitalize;
      font-weight: 500;
    }
  }

  .text-search {
    position: relative;

    button {
      height: 2.5rem;
      width: 2.5rem;
      padding: 0;
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      /* color: var(--primary-600);
      background-color: var(--yellow-light); */

      &:hover {
        /* border: 1px solid var(--text-color); */
      }
    }
  }
`;

export default StyledSearchBar;
