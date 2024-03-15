import styled from "styled-components";
import { PartyForm } from "../../components";

const StyledPartyForm = styled(PartyForm)`
  padding: 1rem 2rem;
  font-family: var(--main-font);
  font-size: 1.65rem;
  line-height: 1.2;

  .title {
    font-size: 2rem;
    font-family: var(--subtitle-font);
    grid-column: 1 / 3;
    padding-bottom: 1rem;
  }

  menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 0.5rem;

    .person {
      font-size: 1.25rem;
      /* padding: 0.25rem; */
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px dashed;
      border-bottom: 1px dashed;

      .del-btn {
        color: var(--red-dark);
        background-color: var(--red-light);
        width: fit-content;
        padding: 0.5rem 0.5rem 0.25rem 0.5rem;
      }
    }

    fieldset {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      border: none;
    }
  }

  .btn-container {
    gap: 0.5rem;
  }

  .btn {
    grid-column: 1 / 3;
    padding-top: 1.5rem;
    height: fit-content;
    width: 50%;
    justify-self: center;
    padding: 0.75rem 0;
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: 0.5rem;
    gap: 0.5rem;
  }

  .btn:disabled {
    cursor: not-allowed;
    background-color: var(--grey-500);
  }

  input:disabled,
  input:read-only {
    cursor: not-allowed;
    background-color: var(--grey-200);
  }
`;

export default StyledPartyForm;
