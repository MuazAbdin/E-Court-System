import styled from "styled-components";
import { CaseForm } from "../../components";

const StyledCaseForm = styled(CaseForm)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  position: relative;

  padding: 2rem;
  font-family: var(--main-font);
  font-size: 1.65rem;
  line-height: 1.2;

  .title {
    font-size: 2rem;
    font-family: var(--subtitle-font);
    grid-column: 1 / 3;
    padding-bottom: 1rem;
  }

  & > .MuiFormControl-root {
    grid-column: 1/3;
    width: 60%;
    justify-self: center;
  }

  .parties {
    grid-column: 1 / 3;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    & > section {
      flex-grow: 1;

      .title {
        font-family: var(--main-font);
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
  }

  fieldset {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border: none;
  }

  & > fieldset {
    grid-column: 1 / 3;
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

  .pdf-btn {
    position: absolute;
    top: 1rem;
    left: 0;
    width: fit-content;
    font-size: 1.75rem;
    padding: 0.75rem;
    background-color: transparent;
    color: var(--text-color);
    box-shadow: none;

    &:hover {
      background-color: transparent;
      color: var(--text-color);
    }
  }
`;
export default StyledCaseForm;
