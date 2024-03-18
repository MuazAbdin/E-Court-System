import styled from "styled-components";
import { SearchBar } from "../../components";

const StyledSearchBar = styled(SearchBar)`
  border-bottom: 1px dashed;

  .search-controller {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: center;
    border-radius: 50px;
    width: min(100%, 25rem);
    margin: auto;
    background-color: var(--primary-600);

    input {
      flex-grow: 1;
      border-radius: 50px;
      border: none;
      padding: 0.5rem 1rem;
      font-family: var(--main-font);
      font-size: 1rem;
    }

    button,
    .filters-list {
      padding: 0.5rem 0.75rem;
      font-family: var(--main-font);
      color: var(--grey-200);
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button {
      height: 100%;
      width: 2.25rem;
      position: absolute;
      right: 0;
      top: 0;
      border: none;
      border-radius: 50px;
    }

    .filters-list {
      border-radius: 50px;
      position: relative;
      &:hover {
        color: var(--primary-600);
      }
    }

    &:has(.filters-list:hover) {
      background-color: var(--primary-400);
    }

    .filters.show {
      display: block;
    }

    .filters {
      display: none;
      position: absolute;
      cursor: auto;
      width: min(600px, 90vw);
      padding: 0.75rem;
      z-index: 10;
      top: calc(100% + 2px);
      left: calc(-1 * min(100px, 15vw));
      line-height: 2rem;
      background-color: var(--background-color);
      color: var(--text-color);
      border-radius: 0.75rem;

      .options-group {
        padding: 0.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        align-content: center;
        gap: 1.5rem;
        border-bottom: 1px dashed var(--text-color);

        .options-group:last-child {
          border: none;
        }

        .options-group__title {
          display: flex;
          align-items: center;
          background-color: hsla(74, 32%, 32%, 0.6);
          padding: 0.5rem;
          font-size: 1.25rem;
        }

        menu {
          list-style-type: none;
          font-size: 1.15rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem 1rem;
        }

        li {
          gap: 0.5rem;
        }
      }
    }
  }

  .range-date-picker {
    padding: 0.5rem 0;
    gap: 0.5rem;
    font-size: 1rem;
    text-transform: capitalize;
    border: none;

    input {
      border-radius: 50px;
      border: none;
      padding: 0.5rem 0.5rem 0.5rem 2rem;
      font-family: var(--main-font);
      font-size: 1rem;
    }
  }

  .pagenation {
    gap: 0.25rem;

    .current {
      box-shadow: 0 0 5px 2px var(--text-color);
    }

    .btn:disabled {
      cursor: not-allowed;
      background-color: var(--grey-500);
      color: var(--grey-200);
    }
  }
`;

export default StyledSearchBar;
